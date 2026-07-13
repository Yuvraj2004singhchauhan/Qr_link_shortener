import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
    });

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access")
    );

    const login = (data) => {

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));


        setAccessToken(data.access);
        setUser(data.user);

    };

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);