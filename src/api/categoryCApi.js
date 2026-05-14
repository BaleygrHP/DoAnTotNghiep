import axiosClient from './axiosClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';

const categoryCApi = {
  getAll(id, params) {
    const url = `/categories/${id}`;
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.getCategoryChildren(id), 'categoryCApi.getAll');
  },
  get(id) {
    const url = `/subcategories/${id}`;
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getSubcategory(id), 'categoryCApi.get');
  },
};
export default categoryCApi;
