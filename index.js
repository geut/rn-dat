/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import './shim';
import 'es6-symbol/implement';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
