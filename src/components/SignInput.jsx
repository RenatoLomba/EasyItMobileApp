import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
    background-color: #76D7C4;
`;
const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
`;

export default ({ IconSvg, ...props }) => {
    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#fff" />
            <Input
                {...props}
            />
        </InputArea>
    );
};
