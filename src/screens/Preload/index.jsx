import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Image } from 'react-native';
import { Container, LoadingIcon, LogoImg } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';

const Preload = () => {
    const { idDispatch, avatarDispatch, favoritesDispatch, appointmentsDispatch } = useContext(UserContext);
    const navigator = useNavigation();

    //CHECK O TOKEN PARA SIGN IN, CASO CONTRÁRIO SIGN UP
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        if (token) {
            try {
                const response = await Api.signIn(email, password);
                if (response.token) {
                    await AsyncStorage.setItem('token', response.token.token);
                    await AsyncStorage.setItem('email', email);
                    await AsyncStorage.setItem('password', password);

                    idDispatch(response.id);
                    avatarDispatch(response.avatar);
                    favoritesDispatch(response.favorites);
                    appointmentsDispatch(response.appointments);

                    navigator.reset({
                        routes: [{ name: 'MainTab' }]
                    });
                } else {
                    navigator.navigate('SignIn');
                }
            } catch (err) {
                alert(err.message);
            }
        } else {
            navigator.navigate('SignIn');
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <Container>
            <LogoImg
                source={require('../../assets/logo_easyit.png')}
            />
            <LoadingIcon size="large" color="#fff" />
        </Container>
    );
};
export default Preload;
Preload.displayName = 'Preload';
