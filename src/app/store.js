import { configureStore } from "@reduxjs/toolkit";
import { tryConnectUser, userSlice } from "../features/user/userSlice";
import { authSlice } from "../features/auth/authSlice";

const AppStore = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer
    }
});

AppStore.dispatch(tryConnectUser());

export { AppStore };