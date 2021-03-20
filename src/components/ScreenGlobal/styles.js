import styled from 'styled-components/native';
import configs from '../../appconfigs.json';

export const Container = styled.SafeAreaView`
    background-color: ${props => props.darkMode ? configs.colors.dark : configs.colors.primary};
    flex: 1;
`;

export const InputArea = styled.View`
    background-color: ${props=> props.darkMode ? configs.colors.darker : configs.colors['slightly-darker']};
    height: 60px;
    border-radius: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    padding: 0 20px;
`;
export const InputText = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    margin-right: 5px;
`;
