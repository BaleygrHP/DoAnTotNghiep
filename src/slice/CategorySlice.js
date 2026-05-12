import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import categoryApi from 'api/categoryApi';

export const getListCategory = createAsyncThunk('listCategory', async (params) => {
  const response = await categoryApi.getAll(params);
  return response;
});
export const categoryDetail = createAsyncThunk('categoryDetail', async (params) => {
  const response = await categoryApi.get(params);
  return response;
});
export const getListCategoryAdmin = createAsyncThunk('listCategoryadmin', async (params) => {
  const response = await adminAPI.listCategories(params);
  return response;
});

export const getCategoryAdmin = createAsyncThunk('getCategoryAdmin', async (id) => {
  const response = await adminAPI.getCategories(id);
  return response;
});
export const createNewCategoryAdmin = createAsyncThunk('createNewCategoryAdmin', async (params) => {
  const response = await adminAPI.addCategories(params);
  return response;
});
export const updateCategoryAdmin = createAsyncThunk('updateCategoryAdmin', async (values) => {
  const response = await adminAPI.updateCategories(values._id,values);
  return response;
});

export const deleteCategoryAdmin = createAsyncThunk('deleteCategoryAdmin', async (id) => {
  const response = await adminAPI.deleteCategories(id);
  return response;
});


const ListCategorySlice = createSlice({
  name: 'category',
  initialState: {
    data: [],
    categoryDetail: [],
    dataA: [],
    categoryDetailA: [],
  },
  reducers: {},
  extraReducers: {
    [getListCategory.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [categoryDetail.fulfilled]: (state, action) => {
      state.categoryDetail = action.payload;
    },
    [getListCategoryAdmin.fulfilled]: (state, action) => {
      state.dataA = action.payload;
    },
    [getCategoryAdmin.fulfilled]: (state, action) => {
      state.categoryDetailA = action.payload;
    },
    [updateCategoryAdmin.fulfilled]: (state, action) => {
      const newCategoryList = state.dataA.map((service) => (service._id === action.payload._id ? action.payload : service));
      state.dataA = newCategoryList;
    },
    [deleteCategoryAdmin.fulfilled]: (state, action) => {
      const newCategoryList = state.dataA.filter((service) => service._id !== action.payload._id);
      state.dataA = newCategoryList;
    },
    [createNewCategoryAdmin.fulfilled]: (state, action) => {
      state.dataA.push(action.payload);
    },
  },
});
const { reducer } = ListCategorySlice;
export default reducer;
