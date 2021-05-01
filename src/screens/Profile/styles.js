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

export const AvatarRow = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const AvatarArea = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const Avatar = styled.Image`
    width: 236px;
    height: 236px;
    border-radius: 118px;
`;
export const CameraButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    align-self: flex-end;
    margin-right: 10px;
    margin-top: -30px;
`;

export const ConfigsArea = styled.View`
    margin-top: 30px;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;
export const ConfigsRow = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
`;
export const ConfigText = styled.Text`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
`;

export const LogoutButton = styled.TouchableOpacity`
    margin-top: 20px;
    height: 60px;
    background-color: ${configs.colors.darker};
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const LogoutButtonText = styled.Text`
    font-size: 18px;
    color: #fff;
`;
