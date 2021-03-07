import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from 'react-native';
import {
    Container,
    Scroller,
    Header,
    HeaderText,
    LoadingIcon,
    ListArea
} from './styles';

import ExpertItem from '../../components/ExpertItem';

const Favorites = () => {
    const { userFavorites } = useContext(UserContext);
    const [showLoading, setShowLoading] = useState(false);
    const [favoritesList, setFavorites] = useState([]);

    const [reloadState, setReload] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        setFavorites(userFavorites);
        setShowLoading(false);
    }, []);

    useEffect(() => {
        setShowLoading(true);
        setFavorites(userFavorites);
        setShowLoading(false);
    }, [userFavorites]);

    return (
        <Container>
            <Scroller>
                <Header>
                    <HeaderText>Favoritos</HeaderText>
                </Header>

                {showLoading && <LoadingIcon size="large" color="#fff" />}

                <ListArea>
                    {favoritesList.length > 0 && favoritesList.sort(() => .5 - Math.random()).map((item, key) => {
                        return <ExpertItem key={`expert__${key}`} data={item.expert} />;
                    })}
                </ListArea>
            </Scroller>
        </Container>
    );
};
export default Favorites;
Favorites.displayName = 'Favorites';
