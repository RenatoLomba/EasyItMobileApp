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
    const { state: userState } = useContext(UserContext);
    const [showLoading, setShowLoading] = useState(false);
    const [favoritesList, setFavorites] = useState([]);

    useEffect(() => {
        setShowLoading(true);
        setFavorites(userState.favorites);
        setShowLoading(false);
    }, []);

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
