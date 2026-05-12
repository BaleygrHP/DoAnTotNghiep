import axiosClient from './axiosClient';
import { isMockMode, mockCategoryCApi } from 'mocks';

const realCategoryCApi = {
  getAll(id, params) {
    const url = `/categories/${id}`;
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/subcategories/${id}`;
    return axiosClient.get(url);
  },
};
const categoryCApi = isMockMode ? mockCategoryCApi : realCategoryCApi;

export default categoryCApi;
