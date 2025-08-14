const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// Custom resolver plugin for React Navigation ESM modules
class ReactNavigationResolver {
  constructor() {
    this.source = 'before-resolve';
    this.target = 'resolve';
  }

  apply(resolver) {
    const target = resolver.ensureHook(this.target);
    resolver.getHook(this.source).tapAsync('ReactNavigationResolver', (request, resolveContext, callback) => {
      // Only process React Navigation modules - safely check context
      if (request.context && 
          typeof request.context === 'string' && 
          (request.context.includes('@react-navigation') || 
           request.context.includes('react-navigation'))) {
        
        // Only process requests without file extensions
        if (request.request && 
            typeof request.request === 'string' &&
            !request.request.endsWith('.js') && 
            !request.request.endsWith('.jsx') && 
            !request.request.endsWith('.ts') && 
            !request.request.endsWith('.tsx') && 
            !request.request.endsWith('.json')) {
          
          // Try with .js extension first
          const newRequest = {
            ...request,
            request: request.request + '.js'
          };
          
          resolver.doResolve(target, newRequest, null, resolveContext, (err, result) => {
            if (!err && result) {
              return callback(null, result);
            }
            
            // If .js fails, try original request
            return callback();
          });
        } else {
          // Pass through requests that already have extensions
          return callback();
        }
      } else {
        // Pass through non-React Navigation requests
        return callback();
      }
    });
  }
}

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Use content hash to avoid conflicts
    chunkFilename: '[name].[contenthash].chunk.js', // Name chunks with content hash
    publicPath: '/',
  },
  // Set stats configuration to handle child compiler errors
  stats: {
    children: true,
    errorDetails: true,
  },
  module: {
    rules: [
      // Special rule for React Navigation modules
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          path.resolve(__dirname, 'node_modules/@react-navigation'),
          path.resolve(__dirname, 'node_modules/react-navigation'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-modules-commonjs',
              '@babel/plugin-transform-flow-strip-types'
            ]
          }
        }
      },
      // Rule for app code and other dependencies
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(react-native|@react-native|react-native-web|react-native-safe-area-context|react-native-vector-icons|react-native-reanimated|react-native-gesture-handler|react-native-screens|@react-native-masked-view)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-transform-flow-strip-types',
              ['@babel/plugin-transform-class-properties', { loose: true }],
              ['@babel/plugin-transform-private-methods', { loose: true }],
              ['@babel/plugin-transform-private-property-in-object', { loose: true }]
            ]
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-gesture-handler': 'react-native-web',
      'react-native-reanimated': 'react-native-web',
      'react-native-screens': 'react-native-web',
      '@react-native-masked-view/masked-view': 'react-native-web',
    },
    // This is the key fix for React Navigation ESM issues
    fullySpecified: false,
    fallback: {
      "path": false,
      "fs": false,
      "crypto": false,
    },
    modules: ['node_modules'],
    mainFields: ['browser', 'module', 'main'],
    plugins: [
      // Add our custom resolver for React Navigation modules
      new ReactNavigationResolver()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      minify: false, // Disable minification to avoid child compilation issues
      inject: true,
      // Update script references
      scriptLoading: 'blocking',
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // Add a plugin to fix React Navigation imports
    new webpack.NormalModuleReplacementPlugin(
      /(@react-navigation.*?|react-navigation.*?)\/(.+)/,
      (resource) => {
        if (!resource.request || typeof resource.request !== 'string') {
          return;
        }
        
        if (resource.request.endsWith('.js') || 
            resource.request.endsWith('.jsx') || 
            resource.request.endsWith('.ts') || 
            resource.request.endsWith('.tsx') || 
            resource.request.endsWith('.json')) {
          return;
        }
        
        // Check if this is a relative import within React Navigation
        if (resource.context && 
            typeof resource.context === 'string' &&
            (resource.context.includes('@react-navigation') || 
             resource.context.includes('react-navigation')) && 
            resource.request.startsWith('.')) {
          resource.request = resource.request + '.js';
        }
      }
    ),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: true,
  },
  // Optimize for production builds
  optimization: {
    runtimeChunk: 'single', // Create a single runtime chunk
    minimize: true,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `vendor.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  // Handle node_modules specially
  externals: {
    // Avoid bundling problematic packages
    'react-native-fs': 'commonjs react-native-fs',
  },
};