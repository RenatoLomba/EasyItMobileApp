/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import StarsComponent from './StarsComponent';

import TrashIcon from '../assets/trash.svg';

import configs from '../appconfigs.json';
import { UserContext } from '../contexts/UserContext';

const Area = styled.TouchableOpacity`
    background-color: ${props => props.darkMode ? configs.colors['slightly-darker'] : '#fff'};
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
    border: 1px solid ${props => props.darkMode ? '#fff' : configs.colors.primary};
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 77%;
    border-radius: 20px;
`;
const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: ${props => props.darkMode ? '#fff' : configs.colors.primary};
`;
const RemoveAppointmentButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 20px;
    /* border: 2px solid #f50045; */
    margin-left: 20px;
`;

const ExpertItem = ({ data, service, modalShowDetail, removeAppointment }) => {
    const { darkMode } = useContext(UserContext);
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
        <Area darkMode={darkMode} onPress={service ? modalShowDetail : handleExpertClick}>
            <Avatar source={{
                uri: data.avatar
            }} />
            <InfoArea>
                <UserName>{data.name}</UserName>

                {/* COMPONENTE DAS ESTRELAS */}
                <StarsComponent stars={data.stars} showScore={true} />

                <SeeProfileButton darkMode={darkMode}>
                    <SeeProfileButtonText darkMode={darkMode}>{service ? 'Detalhes' : 'Ver Perfil'}</SeeProfileButtonText>
                </SeeProfileButton>
            </InfoArea>

            {service &&
                <RemoveAppointmentButton onPress={removeAppointment}>
                    <TrashIcon width="20" height="20" fill={configs.colors['red-wine']} />
                </RemoveAppointmentButton>
            }
        </Area>
    );
};
export default ExpertItem;
ExpertItem.displayName = 'ExpertItem';
