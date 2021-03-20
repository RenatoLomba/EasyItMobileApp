import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Container } from './styles';

// eslint-disable-next-line react/prop-types
const Screen = ({ children }) => {
    const { darkMode } = useContext(UserContext);

    return (
        <Container darkMode={darkMode}>
            {children}
        </Container>
    )
}
Screen.displayName = 'Screen';
export default Screen;
