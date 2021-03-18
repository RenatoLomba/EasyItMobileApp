import React, { createContext, useState } from 'react';
import configs from '../appconfigs.json';

// const fs = require('fs').promises;
// const fs = require('react-native-fs');
// const path = require('path');
// const configsPath = `${fs.DocumentDirectoryPath}/../appconfigs.json`;

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
const UserContextArea = ({ children }) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userFavorites, setUserFavorites] = useState([]);
    const [userAppointments, setUserAppointments] = useState([]);
    const [darkMode, setDarkMode] = useState(configs.darkMode);

    const idDispatch = (id) => setUserId(id);

    const nameDispatch = (name) => setUserName(name);

    const avatarDispatch = (avatar) => setUserAvatar(avatar);

    const favoritesDispatch = (favorites) => setUserFavorites(favorites);

    const appointmentsDispatch = (appointments) => setUserAppointments(appointments);

    const changeMode = async () => {
        try {
            const json = JSON.stringify({ ...configs, darkMode: !darkMode });
            // await fs.writeFile(configsPath, json, 'utf8');
            // await fs.writeFile(configsPath, json, { flag: 'w', encoding: 'utf8' });
            setDarkMode(!darkMode);

            alert(darkMode ? 'Ativado' : 'Desativado');
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <UserContext.Provider value={{
            userId,
            userName,
            userAvatar,
            userFavorites,
            userAppointments,
            darkMode,
            idDispatch,
            nameDispatch,
            avatarDispatch,
            favoritesDispatch,
            appointmentsDispatch,
            changeMode
        }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextArea;
UserContextArea.displayName = 'UserContextArea';
