import React from 'react';
import styled from 'styled-components/native';
import configs from '../appconfigs.json';

const InputArea = styled.View`
    width: 100%;
    height: 60px;;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
    background-color: ${configs.colors.lighter};
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
`;

// eslint-disable-next-line react/prop-types
const SignInput = ({ IconSvg, ...props }) => {
    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#fff" />
            <Input
                {...props}
            />
        </InputArea>
    );
};
export default SignInput;
SignInput.displayName = 'SignInput';
