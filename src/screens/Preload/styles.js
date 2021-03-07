import React from 'react';
import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const Container = styled.SafeAreaView`
    background-color: ${configs.colors.primary};
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const LogoImg = styled.Image`
    max-width: 300px;
    max-height: 169px;
`;
