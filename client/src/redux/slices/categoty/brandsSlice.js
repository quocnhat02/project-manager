import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  resetErrAction,
  resetSuccessAction,
} from '../globalActions/globalActions';
import baseURL from '../../../utils/baseURL';

// initialState
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// fetch brand action
export const fetchBrandsAction = createAsyncThunk(
  'brands/fetch All',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands`);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// create brand action
export const createBrandAction = createAsyncThunk(
  'brand/create',
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      // token - authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // images
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // fetch all
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    // reset err
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    // reset success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

// generate the reducer
const brandReducer = brandsSlice.reducer;

export default brandReducer;
