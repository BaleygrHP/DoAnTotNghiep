import axios from 'axios';
import StorageKeys from 'constants/storage-keys';
const getLocalToken = localStorage.getItem(StorageKeys.TOKEN);
const axiosClient = axios.create({
  baseURL: 
  'https://recommendationkltn.herokuapp.com',

  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    if (getLocalToken) {
      config.headers.common['x-auth-token'] = `${getLocalToken}`;
    }
    return config;
  },
  function error() {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (!error.response) {
      return Promise.reject(error);
    }

    const { config, status, data } = error.response;
    const URLS = ['/auth/register', '/auth', '/googlelogin'];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
