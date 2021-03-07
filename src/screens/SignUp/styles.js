import React from 'react';
import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const Container = styled.SafeAreaView`
    background-color: ${configs.colors.primary};
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const InputArea = styled.View`
    padding: 40px;
    width: 100%;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${configs.colors.darker};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #fff;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #ffffffB3;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #ffffffB3;
    font-weight: bold;
    margin-left: 5px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const LogoImg = styled.Image`
    max-width: 300px;
    max-height: 169px;
`;
