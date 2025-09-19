import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./redux/features/modalSlice";
import authSlice from "./redux/features/authSlice";
import { baseApi } from "./redux/api/baseApi";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
