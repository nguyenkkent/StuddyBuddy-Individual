import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3001/';

export default axiosClient;