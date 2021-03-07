import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
const UserContextArea = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userFavorites, setUserFavorites] = useState([]);
    const [userAppointments, setUserAppointments] = useState([]);

    const idDispatch = (id) => setUserId(id);

    const avatarDispatch = (avatar) => setUserAvatar(avatar);

    const favoritesDispatch = (favorites) => setUserFavorites(favorites);

    const appointmentsDispatch = (appointments) => setUserAppointments(appointments);

    return (
        <UserContext.Provider value={{
            userId,
            userAvatar,
            userFavorites,
            userAppointments,
            idDispatch,
            avatarDispatch,
            favoritesDispatch,
            appointmentsDispatch
        }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextArea;
UserContextArea.displayName = 'UserContextArea';
