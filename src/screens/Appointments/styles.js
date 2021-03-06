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
    margin-bottom: 30px;
`;
export const HeaderText = styled.Text`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
`;

export const Area = styled.TouchableOpacity`
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;
export const InfoArea = styled.View`
    justify-content: space-between;
`;
export const CardHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;
export const RemoveAppointmentButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 20px;
    /* border: 2px solid #f50045; */
    margin-left: 20px;
`;

export const ServiceName = styled.Text`
    font-size: 14px;
    /* font-weight: bold; */
`;
export const Date = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: #737373;
    margin-top: 3px;
`;
export const SeeProfileButton = styled.View`
    border: 1px solid #1ABC9C;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 77%;
    border-radius: 20px;
    margin-top: 10px;
`;
export const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #1ABC9C;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;
