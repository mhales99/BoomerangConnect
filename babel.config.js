module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    ["@babel/plugin-transform-private-property-in-object", { "loose": true }],
    ["@babel/plugin-transform-flow-strip-types"],
    ["@babel/plugin-transform-class-properties", { "loose": true }]
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};