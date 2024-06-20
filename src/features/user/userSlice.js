import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tryLoginUser } from "../auth/authSlice";
import { doFetch } from "../../services/apiUtils";
import { apiInfo } from "../../services/apiInfo";

const tryGetUserInfo = createAsyncThunk("user/tryGetUserInfo", async () => {
    return await doFetch(apiInfo.endpoints.user.profile.get);
});

const tryConnectUser = createAsyncThunk("user/tryConnectUser", async (credentials, thunkApi) => {
    try {
        if(credentials) {
            await thunkApi.dispatch(tryLoginUser(credentials)).unwrap();
        }
        await thunkApi.dispatch(tryGetUserInfo()).unwrap();
    } catch (error) {
        throw error;
    }
});

const tryChangeUserName = createAsyncThunk("user/tryChangeUserName", async (userName) => {
    try {
        const { userName: newUserName } = await doFetch(apiInfo.endpoints.user.profile.update, { userName });
        return newUserName;
    } catch (error) {
        throw error;
    }
});

const defaultState = {
    info: {
        userName: "",
        firstName: "",
        lastName: ""
    },
    isConnected: false
};

function resetState(state) {
    state.info.userName = "";
    state.info.firstName = "";
    state.info.lastName = "";
    state.isConnected = false;
}

const userSlice = createSlice({
    name: "user",
    initialState: defaultState,
    reducers: {
        logoutUser: (state, action) => {
            resetState(state);
        }
    },
    selectors: {
        getIsConnected: (state) => state.isConnected,
        getUserInfo: (state) => state.info
    },
    extraReducers: (builder) => {
        builder.addCase(tryGetUserInfo.fulfilled, (state, action) => {
            const { userName, firstName, lastName } = action.payload.userInfo;
            state.info.userName = userName;
            state.info.firstName = firstName;
            state.info.lastName = lastName;
            state.isConnected = true;
        });
        builder.addCase(tryGetUserInfo.rejected, (state, action) => {
            resetState(state);
        })
        builder.addCase(tryChangeUserName.fulfilled, (state, action) => {
            state.info.userName = action.payload;
        })
    }
});

export { userSlice, tryConnectUser, tryChangeUserName };
export const { logoutUser } = userSlice.actions;
export const { getIsConnected, getUserInfo } = userSlice.selectors;