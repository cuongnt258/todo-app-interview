import axios from 'axios';

const BASE_URL = 'https://api.ticktick.com/open/v1';
const TOKEN = '8c38a50d-bd82-43dc-95af-8cdb0afc6188';

const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default ApiService;
