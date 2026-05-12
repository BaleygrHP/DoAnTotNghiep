import axiosClient from './axiosClient';
import { isMockMode, mockSearchApi } from 'mocks';

const realSearchAPI = {
  getSearch: (params) => {
    const url = '/search';
    return axiosClient.get(url, { params });
  },
  getSearchByWord: (params) => {
    const url = '/products/search/match';
    return axiosClient.get(url, { params });
  },
  getTopTrending: () => {
    const url = '/statistics/googleAnalytics';
    return axiosClient.get(url);
  },
};
const searchAPI = isMockMode ? mockSearchApi : realSearchAPI;

export default searchAPI;
