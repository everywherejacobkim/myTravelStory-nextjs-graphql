import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [loginUser, setLoginUser] = useState({});

    return (
        <UserContext.Provider value={{loginUser, setLoginUser}}>
            {children}
        </UserContext.Provider>
    )
}
