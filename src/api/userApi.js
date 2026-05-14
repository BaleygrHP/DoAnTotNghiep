import axiosClient from './axiosClient';
import { withWebFallback } from './webFallback';
import { webMockApi } from 'mocks/webMockData';

const userApi = {
  register(data) {
    const url = '/users';
    return withWebFallback(() => axiosClient.post(url, data), () => webMockApi.registerUser(data), 'userApi.register');
  },
  login(data, params) {
    const url = '/auth';
    return withWebFallback(() => axiosClient.post(url, data, { params }), () => webMockApi.loginUser(data), 'userApi.login');
  },
  updateInformationUser: (data) => {
    const url = '/users/update';
    return withWebFallback(() => axiosClient.put(url, data), () => webMockApi.updateUser(data), 'userApi.updateInformationUser');
  },
  loginGoogle: (data) => {
    const url = '/googlelogin';
    return withWebFallback(() => axiosClient.post(url, data), () => webMockApi.loginGoogleUser(data), 'userApi.loginGoogle');
  },
  ChangePassword: (data) => {
    const url = '/users/update/password';
    return withWebFallback(() => axiosClient.put(url, data), () => webMockApi.changePassword(data), 'userApi.ChangePassword');
  },
  addAddress: (data) => {
    const url = '/addresses';
    return withWebFallback(() => axiosClient.post(url, data), () => webMockApi.addAddress(data), 'userApi.addAddress');
  },
  getAddress: () => {
    const url = '/addresses';
    return withWebFallback(() => axiosClient.get(url), () => webMockApi.getAddresses(), 'userApi.getAddress');
  },
  updateAddress: (id, data) => {
    const url = `/addresses/${id}`;
    return withWebFallback(() => axiosClient.put(url, data), () => webMockApi.updateAddress(id, data), 'userApi.updateAddress');
  },
  updateDefaultAddress: (id, data) => {
    const url = `/addresses/${id}`;
    return withWebFallback(() => axiosClient.put(url, data), () => webMockApi.updateAddress(id, data), 'userApi.updateDefaultAddress');
  },
  deleteAddress: (id) => {
    const url = `/addresses/${id}`;
    return withWebFallback(() => axiosClient.delete(url), () => webMockApi.deleteAddress(id), 'userApi.deleteAddress');
  },
  resetPassword: (values) => {
    const url = '/resetpassword/generate-token';
    return withWebFallback(() => axiosClient.post(url, values), () => webMockApi.resetPassword(values), 'userApi.resetPassword');
  },
  confirmResetPassword(data) {
    const url = `/resetpassword/reset`;
    return withWebFallback(() => axiosClient.put(url, data), () => webMockApi.confirmResetPassword(data), 'userApi.confirmResetPassword');
  },
};

export default userApi;
