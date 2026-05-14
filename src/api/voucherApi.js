import axiosClient from './axiosClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';
const voucherApi = {
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
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getVouchersForUser(), 'voucherApi.getAllUser');
  },
};
export default voucherApi;
