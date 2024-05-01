import { MMKV } from "react-native-mmkv";

import { Storage } from "redux-persist";

const StorageService = new MMKV();

export default StorageService;
export const reduxStorage: Storage = {
  setItem: (key: string, value: boolean | string | number | Uint8Array) => {
    StorageService.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = StorageService.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    StorageService.delete(key);
    return Promise.resolve();
  },
};
