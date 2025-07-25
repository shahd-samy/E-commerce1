import { createContext, useState } from "react";

export const tokenContext = createContext(null);

export default function TokenProvider({ children }) {
    const [token, settoken] = useState(localStorage.getItem('token'));

    function logout(){
        settoken(null);
        localStorage.removeItem('token');
    }

    return <tokenContext.Provider value={{ token, settoken,logout }}>
        {children}
    </tokenContext.Provider>
}