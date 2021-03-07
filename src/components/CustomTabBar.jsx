/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components/native';
// import base64 from 'react-native-base64';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

import configs from '../appconfigs.json';

const TabArea = styled.View`
    height: 60px;
    background-color: ${configs.colors['slightly-darker']};
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
    border: 3px solid ${configs.colors['slightly-darker']};
    border-radius: 35px;
    margin-top: -32px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

// eslint-disable-next-line react/prop-types
const CustomTabBar = ({ state, navigation }) => {
    const { userAvatar } = useContext(UserContext);

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
                <TodayIcon width="32" height="32" fill={configs.colors['slightly-darker']} />
            </TabItemCenter>
            <TabItem onPress={() => goTo("Favorites")}>
                <FavoriteIcon style={{ opacity: state.index === 3 ? 1 : 0.5 }} width="24" height="24" fill="#fff" />
            </TabItem>
            <TabItem onPress={() => goTo("Profile")}>
                {userAvatar != '' && userAvatar != null ?
                    <AvatarIcon
                        source={{
                            uri: userAvatar,
                        }}
                    /> :
                    <AccountIcon style={{ opacity: state.index === 4 ? 1 : 0.5 }} width="24" height="24" fill="#fff" />
                }
            </TabItem>
        </TabArea>
    );
};
export default CustomTabBar;
CustomTabBar.displayName = 'CustomTabBar';
