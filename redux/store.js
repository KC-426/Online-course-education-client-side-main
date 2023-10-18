import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coursesSlice from "../redux/features/coursesSlice";
import blogSlice from "./features/blogSlice";
import eventSlice from "./features/eventSlice";
import teamSlice from "./features/teamSlice";
import categorySlice from "./features/categorySlice";
import courseDetailsSlice from "./features/courseDetailsSlice";
import cartSlice from "./features/cartSlice";
import myOrderSlice from "./features/myOrderSlice";
import { apiSlice } from "./api/apiSlice";
import userSlice from "./features/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Define the slices you want to persist
const persistConfig = {
  key: "root", // Change this key as needed
  storage,
  // Only persist these slices
  // Add any additional configuration options here
};

// Define your individual reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  courses: coursesSlice, // Use .reducer to access the reducer function
  blogs: blogSlice,
  events: eventSlice,
  teams: teamSlice,
  category: categorySlice,
  courseDetails: courseDetailsSlice,
  user: userSlice,
  order: myOrderSlice,
  cart: cartSlice,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create your Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware), // Add middleware as needed
});

// Create a persistor for the persisted store
export const persistor = persistStore(store);
