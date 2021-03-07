/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import StarsComponent from './StarsComponent';

import configs from '../appconfigs.json';

const Area = styled.TouchableOpacity`
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;
const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;
const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;
const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;
const SeeProfileButton = styled.View`
    border: 1px solid ${configs.colors.primary};
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 77%;
    border-radius: 20px;
`;
const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: ${configs.colors.primary};
`;

const ExpertItem = ({ data }) => {
    const navigator = useNavigation();

    const handleExpertClick = () => {
        navigator.navigate('ExpertInfo', {
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            stars: data.stars
        });
    };

    return (
        <Area onPress={handleExpertClick}>
            <Avatar source={{
                uri: data.avatar
            }} />
            <InfoArea>
                <UserName>{data.name}</UserName>

                {/* COMPONENTE DAS ESTRELAS */}
                <StarsComponent stars={data.stars} showScore={true} />

                <SeeProfileButton>
                    <SeeProfileButtonText>Ver Perfil</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    );
};
export default ExpertItem;
ExpertItem.displayName = 'ExpertItem';
