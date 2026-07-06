import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../../interfaces/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { boolean } from "yup";

const initialState: UserState = {
  userData: null,
  isLoading: true,
  displayedName: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    //set userData
    setUserData: (state, action) => {
      state.userData = {
        uid: action.payload.uid,
      };

      if (action.payload.displayedName) {
        state.displayedName = action.payload.displayedName;
      }
      AsyncStorage.setItem("USER_DATA", JSON.stringify(action.payload));
      state.isLoading = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUserData, setLoading } = userSlice.actions;
export default userSlice.reducer;
