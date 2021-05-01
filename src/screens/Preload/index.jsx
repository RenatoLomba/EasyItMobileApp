import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Image } from 'react-native';
import { Container, LoadingIcon, LogoImg } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';

const Preload = () => {
    const { idDispatch,
        nameDispatch,
        avatarDispatch,
        favoritesDispatch,
        appointmentsDispatch,
        testimonialsDispatch
    } = useContext(UserContext);
    const navigator = useNavigation();

    //CHECK O TOKEN PARA SIGN IN, CASO CONTRÁRIO SIGN UP
    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            try {
                const response = await Api.loginByToken(token);
                if (response.token) {
                    await AsyncStorage.setItem('token', response.token);

                    const mode = await AsyncStorage.getItem('mode');
                    await AsyncStorage.setItem('mode', mode ? mode : 'light');

                    idDispatch(response.id);
                    nameDispatch(response.name);
                    avatarDispatch(response.avatar);
                    favoritesDispatch(response.favorites);
                    appointmentsDispatch(response.appointments);
                    testimonialsDispatch(response.testimonials);

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
