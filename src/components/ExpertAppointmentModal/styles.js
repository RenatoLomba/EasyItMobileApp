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

export const DateSelect = styled.View`
    /* flex: 1; */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const DateText = styled.Text`
    color: #000;
    font-size: 14px;
    font-weight: bold;
`

export const DateSelectButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const DateSelectButtonText = styled.Text`
    color: #737373;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
`

export const HourSelect = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const HourText = styled.Text`
    color: #000;
    font-size: 14px;
    font-weight: bold;
`

export const HourSelectButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const HourSelectButtonText = styled.Text`
    color: #737373;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
`

export const LoadingRegisteringIcon = styled.ActivityIndicator`
    margin: 16px 0;
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

export const AppointmentDate = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #737373;
`;
export const AppointmentDateTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #000;
`;
export const AppointmentDateArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
