import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import categoryCApi from 'api/categoryCApi';

export const getListCategoryChild = createAsyncThunk('listCategoryChild', async (id) => {
  const response = await categoryCApi.getAll(id, { status: true });
  return response;
});
export const categoryCDetail = createAsyncThunk('categoryCDetail', async (id) => {
  const response = await categoryCApi.get(id);
  return response;
});
export const getListCategoryChildAdmin = createAsyncThunk('listCategoryChildadmin', async (params) => {
  const response = await adminAPI.listCategoriesC(params);
  return response;
});
export const categoryCDetailAdmin = createAsyncThunk('categoryCDetailadmin', async (id) => {
  const response = await adminAPI.getCategoriesC(id);
  return response;
});
export const createNewCategoryCAdmin = createAsyncThunk('createNewCategoryCAdmin', async (params) => {
  const response = await adminAPI.addCategoriesC(params);
  return response;
});

export const deleteCategoryCAdmin = createAsyncThunk('deleteCategoryCAdmin', async (id) => {
  const response = await adminAPI.deleteCategoriesC(id);
  return response;
});

export const updateCategoryCAdmin = createAsyncThunk('updateCategoryCAdmin', async (values) => {
  const response = await adminAPI.updateCategoriesC(values._id, values);
  return response;
});

export const updateImageAdmin = createAsyncThunk('updateImageAdmin', async (values) => {
  const response = await adminAPI.updateImageCategoriesC(values._id, values.data);
  return response;
});


const ListCategorySlice = createSlice({
  name: 'category',
  initialState: {
    data: [],
    categoryChildDetail: [],
    dataA: [],
    categoryChildDetailA: [],
  },
  reducers: {},
  extraReducers: {
    [getListCategoryChild.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [categoryCDetail.fulfilled]: (state, action) => {
      state.categoryChildDetail = action.payload;
    },
    [getListCategoryChildAdmin.fulfilled]: (state, action) => {
      state.dataA = action.payload;
    },
    [categoryCDetailAdmin.fulfilled]: (state, action) => {
      state.categoryChildDetailA = action.payload;
    },
    [updateImageAdmin.fulfilled]: (state, action) => {
      const newUserList = state.dataA.map((service) => (service._id === action.payload._id ? action.payload : service));
      state.dataA = newUserList;
    },
    [updateCategoryCAdmin.fulfilled]: (state, action) => {
      const newUserList = state.dataA.map((service) => (service._id === action.payload._id ? action.payload : service));
      state.dataA = newUserList;
    },
    [deleteCategoryCAdmin.fulfilled]: (state, action) => {
      const newUserList = state.dataA.filter((service) => service._id !== action.payload._id);
      state.dataA = newUserList;
    },
    [createNewCategoryCAdmin.fulfilled]: (state, action) => {
      state.dataA.push(action.payload);
    },
  },
});
const { reducer } = ListCategorySlice;
export default reducer;
