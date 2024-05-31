import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../src/features/user/usersSlice';
import userReducer from '../src/features/user/userSlice';
import productsReducer from '../src/features/products/productsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    products: productsReducer
  }
})
