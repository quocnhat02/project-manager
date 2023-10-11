import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';
import productReducer from '../slices/products/productSlices';
import categoryReducer from '../slices/categoty/categoriesSlices';

// store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
