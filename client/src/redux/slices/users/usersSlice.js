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

      // save the user into localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// user slice

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    // handle actions
    // login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });
  },
});

// generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
