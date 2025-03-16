import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserApiSlice } from "./Slice/UserApiSlice";
export const store = configureStore({
  reducer: {
    [UserApiSlice.reducerPath]: UserApiSlice.reducer,  // RTK Query reducer add karein
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApiSlice.middleware), // Middleware add karein
});

// Optional: Auto-refetch listeners
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
