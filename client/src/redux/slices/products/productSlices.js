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
  'products/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, description, category, sizes, brand, colors, price } =
        payload;
      // make request
      // token - authenticated
      // images

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
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// generate the reducer
const productsReducer = productsSlice.reducer;

export default productsReducer;
