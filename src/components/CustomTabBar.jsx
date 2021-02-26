import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components/native';
import base64 from 'react-native-base64';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #16A286;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width:70px;
    height:70px;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    border: 3px solid #16A286;
    border-radius: 35px;
    margin-top: -32px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {
    const { state: userState } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <TabArea>
            <TabItem onPress={() => goTo("Home")}>
                <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.5 }} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItem onPress={() => goTo("Search")}>
                <SearchIcon style={{ opacity: state.index === 1 ? 1 : 0.5 }} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItemCenter onPress={() => goTo("Appointments")}>
                <TodayIcon width="32" height="32" fill="#16A286" />
            </TabItemCenter>
            <TabItem onPress={() => goTo("Favorites")}>
                <FavoriteIcon style={{ opacity: state.index === 3 ? 1 : 0.5 }} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItem onPress={() => goTo("Profile")}>
                {userState.avatar != '' && userState.avatar != null ?
                    <AvatarIcon
                        source={{
                            uri: userState.avatar,
                        }}
                    /> :
                    <AccountIcon style={{ opacity: state.index === 4 ? 1 : 0.5 }} width="24" height="24" fill="#fff" />
                }
            </TabItem>
        </TabArea>
    );
};
