import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./redux/features/modalSlice";
import { baseApi } from "./redux/api/baseApi";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
