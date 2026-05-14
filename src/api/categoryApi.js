import axiosClient from './axiosClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';


const categoryApi = {
  getAll(params) {
    const url = '/categories/pagingcategory/paging';
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.getCategories(params), 'categoryApi.getAll');
  },
  get(id) {
    const url = `/categories/${id}`;
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getCategory(id), 'categoryApi.get');
  },
};
export default categoryApi;
