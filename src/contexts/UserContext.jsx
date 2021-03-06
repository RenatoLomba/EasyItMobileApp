import React, { createContext, useReducer } from 'react';
import { initialState, UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextArea = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextArea;
UserContextArea.displayName = 'UserContextArea';
