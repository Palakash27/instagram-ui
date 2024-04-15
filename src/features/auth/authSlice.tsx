import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser, userLogin } from "./authActions";

export interface Post {
    _id: string;
    content: string;
}

export interface UserInfo {
    _id: string;
    fullName: string;
    email: string;
    username: string;
    about: string;
    pronouns: string;
    posts: Post[];
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
        // signup user
        builder.addCase(signUpUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signUpUser.fulfilled, (state) => {
            state.loading = false;
            state.success = true; // registration successful
        });
        builder.addCase(signUpUser.rejected, (state, { payload }) => {
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
