import axiosClient from './axiosClient';
import { isMockMode, mockVoucherApi } from 'mocks';

const realVoucherApi = {
  getAll() {
    const url = 
    '/coupons';
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/coupons';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/coupons/${id}`;
    return axiosClient.delete(url);
  },
  update(data) {
    const url = `/coupons/${data.id}`;
    return axiosClient.put(url,data);
  },
  getAllUser() {
    const url = 
    '/coupons/checkvalid/all';
    return axiosClient.get(url);
  },
};
const voucherApi = isMockMode ? mockVoucherApi : realVoucherApi;

export default voucherApi;
