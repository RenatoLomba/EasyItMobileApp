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

export const SearchArea = styled.View`
    background-color: #16A286;
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;
export const SearchTextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    margin-right: 5px;
`;

export const SearchButton = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const OrderByArea = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
`;
export const OrderByButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    border-radius: 20px;
`;
export const OrderByButtonText = styled.Text`
    font-weight: bold;
    color: #fff;
    font-size: 14px;
`;

export const ListArea = styled.View`
    margin: 30px 0;
`;
