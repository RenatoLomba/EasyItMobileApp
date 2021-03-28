import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// import configs from '../appconfigs.json';

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
    const [userTestimonials, setUserTestimonials] = useState([]);

    const [darkMode, setDarkMode] = useState(false);

    const idDispatch = (id) => setUserId(id);

    const nameDispatch = (name) => setUserName(name);

    const avatarDispatch = (avatar) => setUserAvatar(avatar);

    const favoritesDispatch = (favorites) => setUserFavorites(favorites);

    const appointmentsDispatch = (appointments) => setUserAppointments(appointments);

    const testimonialsDispatch = (testimonials) => setUserTestimonials(testimonials);

    const changeMode = async () => {
        await AsyncStorage.setItem('mode', darkMode ? 'light' : 'dark');
        setDarkMode(!darkMode);
    }

    const getMode = async () => {
        const mode = await AsyncStorage.getItem('mode');
        setDarkMode(mode === 'dark');
    }

    useEffect(() => {
        getMode();
    }, []);

    return (
        <UserContext.Provider value={{
            userId,
            userName,
            userAvatar,
            userFavorites,
            userAppointments,
            userTestimonials,
            darkMode,
            idDispatch,
            nameDispatch,
            avatarDispatch,
            favoritesDispatch,
            appointmentsDispatch,
            testimonialsDispatch,
            changeMode
        }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextArea;
UserContextArea.displayName = 'UserContextArea';
