import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import orderApi from 'api/orderApi';
import StorageKeys from 'constants/storage-keys';

export const addOrderUser = createAsyncThunk('addOrderUser', async (values) => {
  const response = await orderApi.add(values);
  return response;
});

export const getOrderAdmin = createAsyncThunk('getOrderAdmin', async (params) => {
  const response = await adminAPI.listOrder(params);
  return response;
});
export const getOrderCompleteAdmin = createAsyncThunk('getOrderCompleteAdmin', async (params) => {
  const response = await adminAPI.listOrderComplete(params);
  return response;
});
export const addOrderCompleteAdmin = createAsyncThunk('addOrderCompleteAdmin', async (data) => {
  const response = await adminAPI.addOrderComplete(data);
  return response;
});
export const deleteOrderAdmin = createAsyncThunk('deleteOrderAdmin', async (id) => {
  const response = await adminAPI.deletOrder(id);
  return response;
});
export const statusOrderComplete = createAsyncThunk('statusOrderComplete', async (id) => {
  const response = await adminAPI.statusOrderComplete(id);
  return response;
});
export const statusOrderFail = createAsyncThunk('statusOrderFail', async (id) => {
  const response = await adminAPI.statusOrderFail(id);
  return response;
});

export const getOrder = createAsyncThunk('getOrder', async (params) => {
  const response = await orderApi.getAll(params);
  return response;
});
export const getOrderCompleteUser = createAsyncThunk('getOrderCompleteUser', async (params) => {
  const response = await orderApi.getOrderByEmail(params);
  return response;
});


export const paymentVNPAY = createAsyncThunk('paymentVNPAY', async (id) => {
  const response = await orderApi.getPaymentVNPAY(id);
  return response;
});
export const finalizeMockVnpay = createAsyncThunk('finalizeMockVnpay', async (id) => {
  const response = await orderApi.finalizeMockVnpay(id);
  return response;
});
const ListOrderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    dataComplete: [],
  },
  reducers: {
    checkout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.CART);
      state.data = [];
    },
  },
  extraReducers: {
    [getOrderAdmin.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getOrderCompleteAdmin.fulfilled]: (state, action) => {
      state.dataComplete = action.payload;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getOrderCompleteUser.fulfilled]: (state, action) => {
      state.dataComplete = action.payload;
    },
    [addOrderCompleteAdmin.fulfilled]: (state, action) => {
      const newOrderList = state.data.filter(service => service._id !== action.payload.orderComplete.orderId._id);
      state.data = newOrderList;
      state.dataComplete.unshift(action.payload.orderComplete);
    },
    [deleteOrderAdmin.fulfilled]: (state, action) => {
      const newOrderList = state.data.filter(service => service._id !== action.payload._id);
      state.data = newOrderList;
    },
    [statusOrderComplete.fulfilled]: (state, action) => {
      state.dataComplete = state.dataComplete.map((service) => (service._id === action.payload._id ? action.payload : service));
    },
    [statusOrderFail.fulfilled]: (state, action) => {
      state.dataComplete = state.dataComplete.map((service) => (service._id === action.payload._id ? action.payload : service));
    },
    [finalizeMockVnpay.fulfilled]: (state, action) => {
      state.data = state.data.map((service) => (service._id === action.payload._id ? action.payload : service));
    },
  },
});
const { actions,reducer } = ListOrderSlice;
export const { checkout } = actions;
export default reducer;
