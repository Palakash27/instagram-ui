// RegisterScreen.js
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
// import Error from "../components/Error";
import { registerUser } from "../features/auth/authActions";
import { useAppSelector, useAppDispatch } from "../app/hook";
import styled from "styled-components";
import Error from "../components/Error";

const Signup = () => {
    const { userInfo, success, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate("/login");
        // redirect authenticated user to profile screen
        if (userInfo) navigate("/user-profile");
    }, [navigate, userInfo, success]);

    const submitForm = (data: any) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            alert("Password mismatch");
            return;
        }
        // transform email string to lowercase to avoid case sensitivity issues in login
        data.email = data.email.toLowerCase();
        dispatch(registerUser(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    className="form-input"
                    {...register("fullName")}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-input"
                    {...register("email")}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="username"
                    className="form-input"
                    {...register("username")}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-input"
                    {...register("password")}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Confirm Password</label>
                <input
                    type="password"
                    className="form-input"
                    {...register("confirmPassword")}
                    required
                />
            </div>
            <button type="submit" className="button">
                Login
            </button>
        </StyledForm>
    );
};
export default Signup;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 50vw;
    margin: 0 auto;
    border: 1px solid red;
    .form-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        margin: 1rem 0;
    }
    h1 {
        font-size: 3rem;
        font-weight: 600;
    }
    p {
        font-size: 1.5rem;
        font-weight: 400;
        margin: 1rem 0;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        width: 100%;
        height: 3rem;
        margin: 0.5rem 0;
        border: 1px solid #dbdbdb;
        border-radius: 0.3rem;
        padding: 0 1rem;
        font-size: 1.5rem;
        font-weight: 400;
        background-color: #fafafa;
    }
    button {
        width: 100%;
        height: 3rem;
        margin: 1rem;
        border: none;
        border-radius: 0.3rem;
        padding: 0 1rem;
        font-size: 1.5rem;
        font-weight: 400;
        background-color: #0095f6;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
    }
`;
