import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:5001";

export const signUpUser = createAsyncThunk<
    any,
    { fullName: string; email: string; password: string; username: string }
>(
    "auth/signup",
    async ({ fullName, email, password, username }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios.post(
                `${backendURL}/api/user/signup`,
                { fullName, email, password, username },
                config
            );
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const userLogin = createAsyncThunk<
    any,
    { email: string; password: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        // configure header's Content-Type as JSON
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            `${backendURL}/api/user/login`,
            { email, password },
            config
        );
        // store user's token in local storage
        localStorage.setItem("userToken", data.userToken);
        return data;
    } catch (error: any) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
