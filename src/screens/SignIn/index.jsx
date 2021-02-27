import React, { useState, useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    LoadingIcon,
    LogoImg
} from './styles';
import Api from '../../Api';
import SignInput from '../../components/SignInput';

import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

const SignIn = () => {
    const { dispatch: userDispatcher } = useContext(UserContext);
    const navigator = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    // TELA SIGN UP
    const handleMessageButtonClick = () => {
        navigator.reset({
            routes: [{ name: 'SignUp', }]
        });
    };

    // LOGIN
    const handleSignClick = () => {
        setShowLoading(true);
    };

    const loadPage = async () => {
        if (showLoading) {
            try {
                const response = await Api.signIn(email, password);
                if (response.token) {
                    await AsyncStorage.setItem('token', response.token.token);
                    await AsyncStorage.setItem('email', email);
                    await AsyncStorage.setItem('password', password);

                    userDispatcher({
                        type: 'setAvatar',
                        payload: {
                            avatar: response.avatar,
                        },
                    });
                    userDispatcher({
                        type: 'setId',
                        payload: {
                            id: response.id,
                        },
                    });

                    userDispatcher({
                        type: 'setAppointments',
                        payload: {
                            appointments: response.appointments
                        }
                    });

                    navigator.reset({
                        routes: [{ name: 'MainTab' }]
                    });
                } else {
                    alert(response);
                }
            } catch (error) {
                alert(error.message);
            } finally {
                setShowLoading(false);
            }
        }
    };

    useEffect(() => {
        loadPage();
    }, [showLoading]);

    return (
        <Container>
            <LogoImg
                source={require('../../assets/logo_easyit.png')}
            />
            <InputArea>
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu email"
                    placeholderTextColor="#ffffffB3"
                    value={email}
                    onChangeText={t => setEmail(t)}
                />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#ffffffB3"
                    value={password}
                    onChangeText={t => setPassword(t)}
                    secureTextEntry={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            {showLoading && <LoadingIcon size="large" color="#fff" />}

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
};
export default SignIn;
SignIn.displayName = 'SignIn';
