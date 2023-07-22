import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    userName: null,
    userId: null,
    token: null,
    setUserName: () => {},
    setUserId: () => {},
    setToken: () => {},
});

export const ContextProvider = ({children}) => {
    const [userName, _setUserName] = useState(localStorage.getItem('CURRENT_USER_NAME'));
    const [userId, _setUserId] = useState(localStorage.getItem('CURRENT_USER_ID'));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    // const [token, _setToken] = useState(123);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setUserName = (name) => {
        _setUserName(name);
        if (name) {
            localStorage.setItem('CURRENT_USER_NAME', name);
        } else {
            localStorage.removeItem('CURRENT_USER_NAME');
        }
    }

    const setUserId = (id) => {
        _setUserId(id);
        if (id) {
            localStorage.setItem('CURRENT_USER_ID', id);
        } else {
            localStorage.removeItem('CURRENT_USER_ID');
        }
    }

    return (
        <StateContext.Provider value={{
            userName,
            userId,
            token,
            setToken,
            setUserName,
            setUserId
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);