import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface displayMenu {
  display: boolean;
}

const initialState: displayMenu = {
  display: true
};

export const displayMenuSlice = createSlice({
  name: "displayMenu",
  initialState,
  reducers: {
    setDisplayMenu: (state, action) => {
      state.display = action.payload
    }
  },
 
});

//login
export const {setDisplayMenu} = displayMenuSlice.actions
export const displayMenuSelector = (state: RootState) => state.displayMenu.display;


export default displayMenuSlice.reducer;
