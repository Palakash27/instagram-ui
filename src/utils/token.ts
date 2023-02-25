export const isTokenExpired = (token: string) => {
    var decodedToken = decodeToken(token);
    var result = true;

    if (decodedToken && decodedToken.exp) {
        var expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        result = expirationDate.valueOf() < new Date().valueOf();
    }

    return result;
};

export const decodeToken = (token: string) => {
    try {
        if (token.split(".").length !== 3 || typeof token !== "string") {
            return null;
        }

        var payload = token.split(".")[1];
        var padding = "=".repeat((4 - (payload.length % 4)) % 4);
        var base64 = payload.replace("-", "+").replace("_", "/") + padding;
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
        var decoded = JSON.parse(jsonPayload);
        return decoded;
    } catch (error) {
        return new Error("Invalid token");
    }
};
