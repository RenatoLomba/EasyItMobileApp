import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native';
import {
    Container,
    Scroller,
    Header,
    HeaderText,
    Avatar,
    AvatarRow,
    CameraButton,
    AvatarArea,
    LogoutButton,
    LogoutButtonText,
    ConfigsArea,
    ConfigText,
    ConfigsRow
} from './styles';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AccountIcon from '../../assets/account.svg';
import CameraIcon from '../../assets/camera-icon.svg';

import configs from '../../appconfigs.json';

const Profile = () => {
    const navigator = useNavigation();
    const { userAvatar, userName, darkMode, changeMode } = useContext(UserContext);

    const handleButtonLogout = async () => {
        await AsyncStorage.removeItem('token', () => {
            navigator.reset({
                routes: [{ name: 'Preload' }]
            });
        });
    };

    const handleCameraButton = () => {
        alert('Abrir camera');
    }

    return (
        <Container>
            <Scroller>
                <Header>
                    <HeaderText>Perfil de {userName}</HeaderText>
                </Header>
                <AvatarRow>
                    <AvatarArea>
                        {userAvatar != '' && userAvatar != null ?
                            <Avatar
                                source={{
                                    uri: userAvatar,
                                }}
                            /> :
                            <AccountIcon width="236" height="236" fill="#ffffff" />
                        }
                        <CameraButton onPress={handleCameraButton}>
                            <CameraIcon width="32" height="32" fill="#fff" />
                        </CameraButton>
                    </AvatarArea>
                </AvatarRow>
                <ConfigsArea>
                    <ConfigsRow>
                        <ConfigText>Modo-noturno</ConfigText>
                        <Switch
                            trackColor={{ false: "#767577", true: `${configs.colors.lighter}` }}
                            thumbColor={darkMode ? `${configs.colors['yellow-star']}` : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={changeMode}
                            value={darkMode}
                        />
                    </ConfigsRow>
                </ConfigsArea>
                <LogoutButton onPress={handleButtonLogout}>
                    <LogoutButtonText>LOGOUT</LogoutButtonText>
                </LogoutButton>
            </Scroller>
        </Container>
    );
};
Profile.displayName = 'Profile';
export default Profile;
