import axiosClient from './axiosClient';
import axiosSubClient from './axiosSubClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';
const productApi = {
  getAll(params) {
    const url = '/products/paging';
    return axiosClient.get(url, { params });
  },
  getAllWeb(params) {
    const url = '/products/paging';
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.getProducts(params), 'productApi.getAllWeb');
  },
  getAllSearch() {
    const url = '/products';
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getAllSearchProducts(), 'productApi.getAllSearch');
  },
  get(id) {
    const url = `/products/${id}`;
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getProduct(id), 'productApi.get');
  },
  getSizeByProductId(id) {
    const url = `/sizes/product/${id}`;
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getProductSizes(id), 'productApi.getSizeByProductId');
  },
  getRecommand(values) {
    const url = `/recomentdations`;
    return withWebFallback(() => axiosSubClient.post(url, values), () => webMockApi.getRecommendations(values), 'productApi.getRecommand');
  },
};
export default productApi;
