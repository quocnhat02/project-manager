import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetErrAction } from '../globalActions/globalActions';
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
      const { name, description, category, sizes, brand, colors, price } =
        payload;

      // make request
      const { data } = await axios.post(`${baseURL}/products`, {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
