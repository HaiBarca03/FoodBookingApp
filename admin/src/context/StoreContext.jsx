import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = 'http://localhost:3000'
    const [token, setToken] = useState("")

    useEffect(() => {
        const loadData = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        token,
        setToken,
        url
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider