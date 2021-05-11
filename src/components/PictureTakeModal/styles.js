import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const Picture = styled.Image`
    border-radius: ${props => Number(props.pictureWidth) - (Number(props.pictureWidth) / 1.1)}px;
    width: ${props => props.pictureWidth}px;
    height: ${props => props.pictureHeight}px;
`

export const ButtonConfirm = styled.TouchableOpacity`
    position: absolute;
    min-width: 112px;
    height: 56px;
    background-color: ${configs.colors.primary};
    right: 50px;
    bottom: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 0 10px;
`

export const ButtonConfirmText = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
`

export const ButtonDelete = styled.TouchableOpacity`
    position: absolute;
    min-width: 112px;
    height: 56px;
    background-color: ${configs.colors['red-wine']};
    left: 50px;
    bottom: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 0 10px;
`

export const ButtonDeleteText = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
`

export const LoadingUpload = styled.ActivityIndicator`
    position: absolute;
    top: ${Dimensions.get('screen').height / 2}px;
    right: ${Dimensions.get('screen').width / 2}px;
`;
