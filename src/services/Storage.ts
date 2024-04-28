import {MMKVLoader} from 'react-native-mmkv-storage';

const StorageService = new MMKVLoader().initialize();

export default StorageService;
