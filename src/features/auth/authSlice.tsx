import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

export interface UserInfo {
    _id: string;
    fullName: string;
    email: string;
    username: string;
    __v: number;
}

export interface DetailedUserInfo extends UserInfo {
    followers: UserInfo[];
    following: UserInfo[];
}

interface AuthState {
    loading: boolean;
    userInfo: DetailedUserInfo | null;
    userToken: string | null;
    error: string | null;
    success: boolean;
}

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken"); // deletes token from storage
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
        },
        setCredentials: (state, action: PayloadAction<DetailedUserInfo>) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        // register user
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            state.success = true; // registration successful
        });
        builder.addCase(registerUser.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
        // login user
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.userToken = action.payload.userToken;
        });
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
    },
});
export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
