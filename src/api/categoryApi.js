import axiosClient from './axiosClient';
import { isMockMode, mockCategoryApi } from 'mocks';


const realCategoryApi = {
  getAll(params) {
    const url = '/categories/pagingcategory/paging';
    return axiosClient.get(url, {params});
  },
  get(id) {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
};
const categoryApi = isMockMode ? mockCategoryApi : realCategoryApi;

export default categoryApi;
