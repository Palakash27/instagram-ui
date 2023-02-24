import React, { MouseEvent } from "react";
import styled from "styled-components";

export default function Signup() {
    const handleSubmit = (e: MouseEvent) => {
        e.preventDefault();
    };

    return (
        <Container>
            <h1>Instagram</h1>
            <p>Signup to see photos and videos from your friends</p>
            <form>
                <input type="text" name="Email" placeholder="Email" />
                <input type="text" name="Full Name" placeholder="Full Name" />
                <input type="text" name="Username" placeholder="Username" />
                <input type="text" name="password" placeholder="Password" />
                <input type={"submit"} value="Signup" onClick={handleSubmit} />
            </form>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 50vw;
    margin: 0 auto;
    border: 1px solid red;
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
    input[type="submit"] {
        background-color: #0095f6;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
    }
`;
