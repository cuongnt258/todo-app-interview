import axios from "axios";

import { dispatch } from "@store/actions";
import { SettingActions } from "@store/slices/settingSlice";

const BASE_URL = "https://api.todoist.com/sync/v9";
const TOKEN = "535f0054494d4f50060a4c4c438698b611dace3e";

const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

ApiService.interceptors.response.use(
  (response) => {
    const sync_token = response.data.sync_token;

    sync_token && dispatch(SettingActions.setSyncToken(sync_token));
    return response;
  },
  (error) => {
    console.log("[🪵] Api → error", error);
    return Promise.reject(error);
  },
);

export default ApiService;
