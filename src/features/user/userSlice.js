import { createSlice } from "@reduxjs/toolkit";

function getInitialState() {
    return {
        isConnected: false
    };
}

const userSlice = createSlice({
    name: "user",
    initialState: getInitialState(),
    reducers: {
        setIsConnected: (state, action) => {
            state.isConnected = action.payload;
        }
    },
    selectors: {
        getIsConnected: (state) => state.isConnected
    }
});

export { userSlice };
export const { getIsConnected } = userSlice.selectors;
export const { setIsConnected } = userSlice.actions;