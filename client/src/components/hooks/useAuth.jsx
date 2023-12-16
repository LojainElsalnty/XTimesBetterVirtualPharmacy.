import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();
const UsernameContext = React.createContext();
const UserTypeContext = React.createContext();
const RecoveryContext = React.createContext();
const OTPContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}
export function useUsername() {
    return useContext(UsernameContext);
}

export function useUserType() {
    return useContext(UserTypeContext);
}

export function useRecoveryContext() {
    return useContext(RecoveryContext);
}

export function useOTPContext() {
    return useContext(OTPContext);
}

export function AuthProvider({ children }) {
    /*     const [accessToken, setAccessToken] = useState("Bearer  ");
        const [refreshToken, setRefreshToken] = useState("");
        const [username, setUsername] = useState("");
        const [userType, setUserType] = useState(""); */

    const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken") ? sessionStorage.getItem("accessToken") : "Bearer  ");
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem("refreshToken") ? sessionStorage.getItem("refreshToken") : "");
    const [username, setUsername] = useState(sessionStorage.getItem("username") ? sessionStorage.getItem("username") : "");
    const [userType, setUserType] = useState(sessionStorage.getItem("userType") ? sessionStorage.getItem("userType") : "");

    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    function updateAccessToken(token) {
        setAccessToken(token);
    }

    function updateRefreshToken(token) {
        setRefreshToken(token);
    }

    return (
        <AuthContext.Provider value={{ accessToken: accessToken, refreshToken: refreshToken }}>
            <AuthUpdateContext.Provider value={{ updateAccessToken: updateAccessToken, updateRefreshToken: updateRefreshToken }}>
                <UsernameContext.Provider value={{ username: username, setUsername: setUsername }}>
                    <UserTypeContext.Provider value={{ userType: userType, setUserType: setUserType }}>
                        <RecoveryContext.Provider value={{ otp, setOTP, email, setEmail }}>
                            <OTPContext.Provider value={{ otpSent, otpVerified, setOtpSent, setOtpVerified }}>
                                {children}
                            </OTPContext.Provider>
                        </RecoveryContext.Provider>
                    </UserTypeContext.Provider>
                </UsernameContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}