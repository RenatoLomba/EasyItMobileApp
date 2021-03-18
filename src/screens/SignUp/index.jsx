import React, { useState, useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import { hashPassword } from '../../modules/hashPassword';

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
import PersonIcon from '../../assets/person.svg';

const SignUp = () => {
    const { idDispatch,
        nameDispatch,
        avatarDispatch,
        favoritesDispatch,
        appointmentsDispatch } = useContext(UserContext);
    const navigator = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    // TELA SIGN IN
    const handleMessageButtonClick = () => {
        navigator.reset({
            routes: [{ name: 'SignIn', }]
        });
    };

    // CADASTRO
    const handleSignClick = async () => {
        setShowLoading(true);
    };

    const loadPage = async () => {
        if (showLoading) {
            try {
                const hashedPassword = await hashPassword(password);
                const response = await Api.signUp(name, email, hashedPassword);
                if (response.token) {
                    await AsyncStorage.setItem('token', response.token.token);
                    await AsyncStorage.setItem('email', email);

                    idDispatch(response.id);
                    nameDispatch(response.name);
                    avatarDispatch(response.avatar);
                    favoritesDispatch(response.favorites);
                    appointmentsDispatch(response.appointments);

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
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#ffffffB3"
                    value={name}
                    onChangeText={t => setName(t)}
                />

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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            {showLoading && <LoadingIcon size="large" color="#fff" />}

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
};
export default SignUp;
SignUp.displayName = 'SignUp';
