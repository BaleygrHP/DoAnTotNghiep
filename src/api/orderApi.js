import axiosClient from './axiosClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';


const orderApi = {
  getAll(params) {
    const url = '/orders';
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.getOrders(params), 'orderApi.getAll');
  },
  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '/orders';
    return withWebFallback(() => axiosClient.post(url, data), () => webMockApi.addOrder(data), 'orderApi.add');
  },
  delete(id) {
    const url = `/orders/${id}`;
    return withWebFallback(() => axiosClient.delete(url), () => webMockApi.cancelOrder(id), 'orderApi.delete');
  },
  update(data) {
    const url = `/orders/${data.id}`;
    return axiosClient.patch(url,data);
  },
  getOrderByEmail(params) {
    const url = `/ordercompletes/search/getByEmail`;
    return withWebFallback(() => axiosClient.get(url, { params }), () => webMockApi.getCompletedOrders(params), 'orderApi.getOrderByEmail');
  },
  getPaymentVNPAY(id) {
    const url = `/orders/payment/vnPay/${id}`;
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.payWithVNPay(id), 'orderApi.getPaymentVNPAY');
  },
};
export default orderApi;
