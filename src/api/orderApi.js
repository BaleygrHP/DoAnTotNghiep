import axiosClient from './axiosClient';
import { isMockMode, mockOrderApi } from 'mocks';


const realOrderApi = {
  getAll(params) {
    const url = '/orders';
    return axiosClient.get(url, {params});
  },
  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
  update(data) {
    const url = `/orders/${data.id}`;
    return axiosClient.patch(url,data);
  },
  getOrderByEmail(params) {
    const url = `/ordercompletes/search/getByEmail`;
    return axiosClient.get(url, {params});
  },
  getPaymentVNPAY(id) {
    const url = `/orders/payment/vnPay/${id}`;
    return axiosClient.get(url);
  },
  finalizeMockVnpay() {
    return Promise.reject(new Error('Mock VNPAY finalization is only available in mock mode'));
  },
};
const orderApi = isMockMode ? mockOrderApi : realOrderApi;

export default orderApi;
