import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../slices/users/usersSlice';
import productReducer from '../slices/products/productSlices';
import categoryReducer from '../slices/categories/categoriesSlices';
import brandReducer from '../slices/categories/brandsSlice';
import colorReducer from '../slices/categories/colorsSlice';
import couponsReducer from '../slices/coupons/couponsSlice';

// store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
    coupons: couponsReducer,
  },
});

export default store;
