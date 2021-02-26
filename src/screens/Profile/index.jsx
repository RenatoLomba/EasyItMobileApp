import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native';
import { Container } from './styles';

export default () => {
    const navigator = useNavigation();
    const handleButtonLogout = async () => {
        await AsyncStorage.removeItem('token', () => {
            navigator.reset({
                routes: [{ name: 'Preload' }]
            });
        });
    };
    return (
        <Container>
            <Text>Profile</Text>
            <Button title="Logout" onPress={handleButtonLogout} />
        </Container>
    );
};
