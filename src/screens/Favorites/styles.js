import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #1ABC9C;
    flex: 1;
`;
export const Scroller = styled.ScrollView`
    flex: 1;
    margin-top: 50px;
    padding: 20px;
`;
export const Header = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
export const HeaderText = styled.Text`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
`;

export const ListArea = styled.View`
    margin: 30px 0;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;
