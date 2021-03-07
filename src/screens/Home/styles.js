import React from 'react';
import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const Container = styled.SafeAreaView`
    background-color: ${configs.colors.primary};
    flex: 1;
`;
export const Scroller = styled.ScrollView`
    flex: 1;
    margin-top: 50px;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const HeaderText = styled.Text`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    width: 240px;
`;
export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`;

export const LocationArea = styled.View`
    background-color: ${configs.colors['slightly-darker']};
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding: 0 20px;
`;
export const LocationInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    margin-right: 5px;
`;
export const LocationFinder = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin: 30px 0;
`;
