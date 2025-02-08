import Cookies from "js-cookie";
import { axiosInstance } from ("../../lib/axios");
import { createContext, useContext, useEffect, useMemo, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken_] = useState(Cookies.get("accessToken"));

    const setToken = (newToken) => {
        setToken_(newToken);
    }


    useEffect(() => {
        if (token) {
            axiosInstance.default.header.common["Authorization"] = `Bearer ${token}`;
            Cookies.set("accessToken", token, { expires: 1 / 24 });
        }else{
            delete axiosInstance.default.headers.common["Authorization"];
            Cookies.remove("accessToken");
        }
    }, [token]);


    const contextValue = useMemo(() => ({
        token,
        setToken,
    }), [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
      
}


export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
