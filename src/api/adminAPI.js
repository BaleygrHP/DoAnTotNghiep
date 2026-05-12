import axiosClient from './axiosClient';
import { isMockMode, mockAdminAPI } from 'mocks';

const realAdminAPI = {
  //------------------Product------------------
  listProduct: (params) => {
    const url = '/products';
    return axiosClient.get(url, { params });
  },
  addProduct: (data) => {
    const url = '/products';
    return axiosClient.post(url, data);
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  updateProduct: (id, data) => {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },

  updateImageProduct: (id, data) => {
    const url = `/products/images/${id}`;
    return axiosClient.post(url, data);
  },


  updateMultipleImageProduct: (id, data) => {
    const url = `/products/imagesMutiple/${id}`;
    return axiosClient.post(url, data);
  },
  //------------------Category------------------
  listCategories: (params) => {
    const url = '/categories/pagingcategory/paging';
    return axiosClient.get(url, { params });
  },
  getCategories: (id) => {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  addCategories: (data) => {
    const url = '/categories';
    return axiosClient.post(url, data);
  },
  updateCategories: (id, data) => {
    const url = `/categories/${id}`;
    return axiosClient.put(url,data);
  },
  deleteCategories: (id) => {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
  //------------------CategoryChild------------------
  listCategoriesC: (params) => {
    const url = '/subcategories';
    return axiosClient.get(url, { params });
  },
  getCategoriesC: (id) => {
    const url = `/subcategories/${id}`;
    return axiosClient.get(url);
  },
  addCategoriesC: (data) => {
    const url = '/subcategories';
    return axiosClient.post(url, data);
  },
  deleteCategoriesC: (id) => {
    const url = `/subcategories/${id}`;
    return axiosClient.delete(url);
  },
  updateCategoriesC: (id, data) => {
    const url = `/subcategories/${id}`;
    return axiosClient.put(url, data);
  },
  updateImageCategoriesC: (id, data) => {
    const url = `/subcategories/images/${id}`;
    return axiosClient.post(url, data);
  },
  //------------------Order------------------
  listOrder: (params) => {
    const url = '/orders/search';
    return axiosClient.get(url, { params });
  },

  deletOrder: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.delete(url, {
      data: {
        status: 'Cancel',
      },
    });
  },

  //------------------OrderComplete------------------
  addOrderComplete: (data) => {
    const url = '/ordercompletes';
    return axiosClient.post(url, data);
  },
  listOrderComplete: (params) => {
    const url = '/ordercompletes/paging';
    return axiosClient.get(url, { params });
  },
  statusOrderComplete: (id) => {
    const url = `/ordercompletes/status/${id}`;
    return axiosClient.put(url, { status: 'Done' });
  },
  statusOrderFail: (id) => {
    const url = `/ordercompletes/status/${id}`;
    return axiosClient.put(url, { status: 'Failed' });
  },

  //------------------user------------------
  getAllUser: (params) => {
    const url = '/users/search';
    return axiosClient.get(url, { params });
  },
  updateUser: (id, data) => {
    const url = `/users/updatewithAdmin/${id}`;
    return axiosClient.put(url, data);
  },
  deleteAccountUser(id) {
    const url = `/users/admin/${id}`;
    return axiosClient.delete(url);
  },
  addUser: (params) => {
    const url = '/users/admin/register';
    return axiosClient.post(url, params);
  },
  //------------------voucher------------------
  addVoucher(data) {
    const url = '/coupons';
    return axiosClient.post(url, data);
  },
  deleteVoucher(id) {
    const url = `/coupons/${id}`;
    return axiosClient.delete(url);
  },
  updateVoucher: (id, data) => {
    const url = `/coupons/${id}`;
    return axiosClient.put(url, data);
  },
  //------------------Sale------------------
  addSale(data) {
    const url = '/sales';
    return axiosClient.post(url, data);
  },
  deleteSale(id) {
    const url = `/sales/${id}`;
    return axiosClient.delete(url);
  },
  updateSale: (id, data) => {
    const url = `/sales/${id}`;
    return axiosClient.put(url, data);
  },
  getSaleByProductId: (id) => {
    const url = `sales/product/${id}`;
    return axiosClient.get(url);
  },
  //------------------Size&Color------------------
  getSizeProduct(id) {
    const url = `/sizes/product/${id}`;
    return axiosClient.get(url);
  },
  getSizeById(id) {
    const url = `/sizes/${id}`;
    return axiosClient.get(url);
  },
  addSizeAColor(data) {
    const url = '/sizes';
    return axiosClient.post(url, data);
  },
  deleteSizeAColor(id) {
    const url = `/sizes/${id}`;
    return axiosClient.delete(url);
  },
  updateSizeAColor: (id, data) => {
    const url = `/sizes/${id}`;
    return axiosClient.put(url, data);
  },
};
const adminAPI = isMockMode ? mockAdminAPI : realAdminAPI;

export default adminAPI;
