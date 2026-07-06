import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import { persistedCartSlice } from "./persisted/persistedConfig";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    cartSlice: persistedCartSlice,
    userSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
