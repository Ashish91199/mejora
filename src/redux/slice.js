import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : {};

const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: storedUser,
        isLoggedIn: Object.keys(storedUser).length > 0,
    },
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
            state.isLoggedIn = true;
            const data = JSON.stringify(state.userDetails);
            localStorage.setItem("userDetails", data);
        },
        logout: (state) => {
            state.userDetails = {};
            state.isLoggedIn = false;
            localStorage.removeItem("userDetails");
        },
    },
});

export const { setUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
