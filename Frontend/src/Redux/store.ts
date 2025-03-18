import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserApiSlice } from "./Slice/UserApiSlice";
import rootReducer from "./rootReducer";
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserApiSlice.middleware), // Middleware add karein
});

// Initialize the application by pre-fetching user data
const initialiseApp = async () => {
  try {
    const result = await store.dispatch(
      UserApiSlice.endpoints.getUserProfile.initiate({}, { forceRefetch: true })
    ).unwrap();
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

initialiseApp();



// Optional: Auto-refetch listeners
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
