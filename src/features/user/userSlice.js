import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, tryLoginUser } from "../auth/authSlice";
import { doFetch } from "../../services/apiUtils";
import { apiInfo } from "../../services/apiInfo";

const tryGetUserInfo = createAsyncThunk("user/tryGetUserInfo", async () => {
    return await doFetch(apiInfo.endpoints.user.profile.get);
});

const tryConnectUser = createAsyncThunk("user/tryConnectUser", async (credentials, thunkApi) => {
    try {
        if(credentials) {
            await thunkApi.dispatch(tryLoginUser(credentials)).unwrap();
            console.log("GOT TOKEN");
        }
        console.log("has token", Boolean(getToken()));
        await thunkApi.dispatch(tryGetUserInfo()).unwrap();
    } catch (error) {
        console.error("tryConnectUser", error);
        throw error;
    }
});

function getInitialState() {
    return {
        info: null,
        isConnected: false
    };
}

const userSlice = createSlice({
    name: "user",
    initialState: getInitialState(),
    reducers: {
        logoutUser: (state, action) => {
            state.info = null;
            state.isConnected = false;
            console.log("USER logout", state);
        }
    },
    selectors: {
        getIsConnected: (state) => state.isConnected,
        getUserInfo: (state) => state.info
    },
    extraReducers: (builder) => {
        builder.addCase(tryGetUserInfo.fulfilled, (state, action) => {
            state.info = action.payload.userInfo;
            state.isConnected = true;
        })
    }
});

export { userSlice, tryConnectUser };
export const { logoutUser } = userSlice.actions;
export const { getIsConnected, getUserInfo } = userSlice.selectors;