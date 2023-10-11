import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../../utils/baseUrl';

// initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

// login action
export const loginUserAction = createAsyncThunk(
  'users/login',
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // make the http request
      const { data } = await axios.post(`${baseUrl}/users/login`, {
        email,
        password,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
