import React from 'react';
import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.darkMode ? configs.colors.dark : '#fff'};
`;
export const Scroller = styled.ScrollView`
    margin-top: 30px;
    flex: 1;
`;

export const SwipeDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: ${props => props.color || "#FFF"};
    border-radius: 5px;
    margin: 3px;
`;

export const SwipeItem = styled.View`
    background-color: ${configs.colors.primary};
    flex: 1;
`;
export const SwipeImage = styled.Image`
    width: 100%;
    height: 240px;
`;

export const FakeSwipper = styled.View`
    width: 100%;
    height: 240px;
`;

export const PageBody = styled.View`
    background-color: ${props => props.darkMode ? configs.colors.dark : '#fff'};
    border-top-left-radius: 50px;
    margin-top: -475px;
    min-height: 400px;
`;

export const ExpertInfoArea = styled.View`
    flex-direction: row;
    margin-top: -50px;
`;
export const ExpertAvatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 20px;
    border-width: 4px;
    border-color: ${props => props.darkMode ? configs.colors.dark : '#fff'};
`;
export const ExpertInfo = styled.View`
    flex: 1;
    align-items: center;
    align-self: flex-end;
`;
export const ExpertNameText = styled.Text`
    color: ${props => props.darkMode ? '#fff' : '#000'};
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
`;
export const ExpertFavButton = styled.TouchableOpacity`
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    align-self: center;
    border: 2px solid ${configs.colors['red-wine']};
    margin: 0 10px;
`;

export const ServicesListArea = styled.View`
    padding: 30px;
`;
export const ServiceListAreaTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.darkMode ? '#fff' : configs.colors['slightly-darker']};
    margin-bottom: 10px;
    margin-left: 10px;
`;
export const ServiceItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;
export const ServiceInfo = styled.View`
    flex: 1;
`;
export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.darkMode ? '#fff' : configs.colors.primary};
`;
export const ServicePrice = styled.Text`
    font-size: 14px;
    color: ${props => props.darkMode ? '#fff' : configs.colors.primary};
`;
export const ServiceChooseButton = styled.TouchableOpacity`
    background-color: ${configs.colors['slightly-darker']};
    padding: 10px 15px;
    border-radius: 10px;
`;
export const ServiceChooseButtonText = styled.Text`
    font-weight: bold;
    color: ${'#fff'};
`;

export const TestimonialsArea = styled.View`
    margin-bottom: 25px;
`;
export const TestimonialItem = styled.View`
    padding: 15px;
    background-color: ${configs.colors.darker};
    border-radius: 10px;
    height:110px;
    justify-content: center;
    margin: 0 40px;
`;
export const TestimonialHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;
export const TestimonialTitle = styled.Text`
    font-size: 16px;
    color: #fff;
    font-weight: bold;
`;
export const TestimonialDescription = styled.Text`
    font-size: 14px;
    color: #fff;
`;
export const TestimonialAddButtonArea = styled.View`
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
    margin-left: 20px;
`;
export const TestimonialAddButton = styled.TouchableOpacity`
    background-color: ${configs.colors['slightly-darker']};
    padding: 10px 15px;
    border-radius: 10px;
`;
export const TestimonialAddButtonText = styled.Text`
    font-weight: bold;
    color: ${'#fff'};
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;
