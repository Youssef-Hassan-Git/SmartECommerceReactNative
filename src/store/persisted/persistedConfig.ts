import AsyncStorage from "@react-native-async-storage/async-storage";
import cartReducer from "../reducers/cartSlice"
import {persistReducer} from "redux-persist"


const persistConfig = {
    key: "cart",
    storage: AsyncStorage,
    whitelist: ['cartItems'],

}


export const persistedCartSlice = persistReducer(persistConfig, cartReducer) 