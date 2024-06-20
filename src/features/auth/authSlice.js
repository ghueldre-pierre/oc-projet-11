import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInfo } from "../../services/apiInfo";
import { doFetch } from "../../services/apiUtils";
import { logoutUser } from "../user/userSlice";
import { AppStore } from "../../app/store";

const tryLoginUser = createAsyncThunk("auth/tryLogin", async (credentials, thunkApi) => {
    try {
        const { persist } = credentials;
        const { token } = await doFetch(apiInfo.endpoints.user.login, credentials);
        return { token, persist };
    } catch (error) {
        throw error;
    }
});

const TOKEN_STORAGE_KEY = "ARGENT_BANK_TOKEN";

function getInitialState() {
    return {
        token: sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY) || ""
    };
}

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(tryLoginUser.fulfilled, (state, action) => {
            const { token, persist } = action.payload;
            const storage = persist ? localStorage : sessionStorage;
            storage.setItem(TOKEN_STORAGE_KEY, token);
            state.token = token;
        })
        .addCase(logoutUser, (state) => {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            sessionStorage.removeItem(TOKEN_STORAGE_KEY);
            state.token = "";
        });
    }
});

function getToken() {
    return AppStore.getState().auth.token;
}

export { authSlice, tryLoginUser, getToken };