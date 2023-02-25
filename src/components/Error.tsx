import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    // any props that come into the component
}

const Error = ({ children, ...props }: Props) => {
    return (
        <div
            style={{
                color: "#f23838",
                textAlign: "center",
                margin: "0.5rem 0",
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Error;
