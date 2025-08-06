const authErrorCodes = {
    invalid_token:
        "That login link is invalid or has already been used. Please request a new one",
    expired_token: "That login link has expired. Please request a new one.",
    missing_token:
        "The login link was missing information. Please request a new one",
    default: "Something went wrong during login. Please request a new link.",
};

const getFriendlyErrorCode = (message) => {
    switch (message) {
        case "Invalid login token":
        case "Invalid token":
            return "invalid_token";
        case "Token has expired":
        case "Email link is invalid or has expired":
            return "expired_token";
        case "Missing token_hash":
            return "missing_token";
        default:
            return "default";
    }
};

const resolveErrorCode = (code) => {
    return authErrorCodes[code] || authErrorCodes["default"];
};

export { authErrorCodes, getFriendlyErrorCode, resolveErrorCode };
