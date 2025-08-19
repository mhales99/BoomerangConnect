// Direct web entry point - simplified for troubleshooting
import { AppRegistry } from 'react-native';
import WebApp from './src/WebApp';

// Register the app
AppRegistry.registerComponent('BoomerangConnect', () => WebApp);

// Run the app
AppRegistry.runApplication('BoomerangConnect', {
  rootTag: document.getElementById('root')
});