import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();
const UsernameContext = React.createContext();
const UserTypeContext = React.createContext();
const RecoveryContext = React.createContext();

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


export function AuthProvider({ children }) {
/*     const [accessToken, setAccessToken] = useState("Bearer  ");
    const [refreshToken, setRefreshToken] = useState("");
    const [username, setUsername] = useState("");
    const [userType, setUserType] = useState(""); */

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "Bearer  ");
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : "");
    const [username, setUsername] = useState(localStorage.getItem("username") ? localStorage.getItem("username") : "");
    const [userType, setUserType] = useState(localStorage.getItem("userType") ? localStorage.getItem("userType") : "");

    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");

    function updateAccessToken(token) {
        setAccessToken(token);
    }

    function updateRefreshToken(token) {
        setRefreshToken(token);
    }

    return (
        <AuthContext.Provider value={{accessToken: accessToken, refreshToken: refreshToken}}>
            <AuthUpdateContext.Provider value={{updateAccessToken: updateAccessToken, updateRefreshToken: updateRefreshToken}}>
                <UsernameContext.Provider value={{username: username, setUsername: setUsername}}>
                    <UserTypeContext.Provider value={{userType: userType, setUserType: setUserType}}>
                        <RecoveryContext.Provider value={{otp, setOTP, email, setEmail}}>
                            {children}
                        </RecoveryContext.Provider>
                    </UserTypeContext.Provider>
                </UsernameContext.Provider>
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}