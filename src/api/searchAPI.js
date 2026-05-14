import axiosClient from './axiosClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';
const searchAPI = {
  getSearch: (params) => {
    const url = '/search';
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.searchProducts(params), 'searchAPI.getSearch');
  },
  getSearchByWord: (params) => {
    const url = '/products/search/match';
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.searchProducts(params), 'searchAPI.getSearchByWord');
  },
  getTopTrending: () => {
    const url = '/statistics/googleAnalytics';
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getTopTrending(), 'searchAPI.getTopTrending');
  },
};
export default searchAPI;
