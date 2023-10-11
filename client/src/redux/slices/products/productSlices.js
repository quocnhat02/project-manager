import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  resetErrAction,
  resetSuccessAction,
} from '../globalActions/globalActions';
import baseURL from '../../../utils/baseURL';

// initialState
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// create product action
export const createProductAction = createAsyncThunk(
  'product/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;

      // token - authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //   formData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);

      formData.append('price', price);
      formData.append('totalQty', totalQty);

      sizes.forEach((size) => {
        formData.append('sizes', size);
      });
      colors.forEach((color) => {
        formData.append('colors', color);
      });
      files.forEach((file) => {
        formData.append('files', file);
      });

      // images
      const { data } = await axios.post(
        `${baseURL}/products`,
        {
          name,
          description,
          category,
          sizes,
          brand,
          colors,
          price,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    // reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // reset error
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.error = null;
    });
  },
});

// generate the reducer
const productReducer = productsSlice.reducer;

export default productReducer;
