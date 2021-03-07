import React from 'react';
import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const Modal = styled.Modal``;
export const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: flex-end;
`;
export const ModalBody = styled.View`
    background-color: ${configs.colors.primary};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 20px;
`;
export const CloseModalButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
`;

export const ModalItem = styled.View`
    background-color: #fff;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
`;
export const ModalExpertInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const ModalExpertAvatar = styled.Image`
    width:56px;
    height:56px;
    border-radius: 12px;
    margin-right: 20px;
`;
export const ModalExpertName = styled.Text`
    color: #000000;
    font-size:18px;
    font-weight: bold;
`;

export const ModalServiceInfo = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
export const ModalServiceName = styled.Text`
    color: #000000;
    font-size: 14px;
    font-weight: bold;
`;
export const ModalServicePrice = styled.Text`
    color: #000000;
    font-size: 14px;
    font-weight: bold;
`;

export const FinishAppointmentButton = styled.TouchableOpacity`
    background-color: ${configs.colors.darker};
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    height: 60px;
`;
export const FinishAppointmentButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`;

export const DateInfo = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const DatePrevButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
    flex: 1;
`;
export const DateNextButton = styled.TouchableOpacity`
    flex-direction: row;
    flex: 1;
`;
export const DateTitleArea = styled.View`
    flex-direction: row;
    justify-content: center;
    flex: 1;
`;
export const DateTitleText = styled.Text`
    color: #000000;
    font-size: 16px;
    font-weight: bold;
`;
export const DateList = styled.ScrollView`
    flex-direction: row;
`;
export const DateSelectButton = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 5px 0;
`;
export const DateWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;
export const DateDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

export const HourList = styled.ScrollView`
    flex-direction: row;
`;
export const HourSelectButton = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 5px 10px;
`;
export const HourText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

export const LoadingRegisteringIcon = styled.ActivityIndicator`
    margin: 16px 0;
`;
