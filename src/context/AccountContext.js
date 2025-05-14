import React, { createContext, useState, useContext } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [accountData, setAccountData] = useState({
        uid: null,
        token: null,
        role: null,
        fullName: null,
        plan: null,
        isAdmin: null,
    });

    return (
        <AccountContext.Provider value={{ accountData, setAccountData }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);
