import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/user/userSlice";

const AppStore = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});

export { AppStore };