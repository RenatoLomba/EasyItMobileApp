import React, { useState, useEffect, useContext } from 'react';
import { Platform, RefreshControl, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    Scroller,
    HeaderArea,
    HeaderText,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles';
import Api from '../../Api';
import ExpertItem from '../../components/ExpertItem';
import Screen from '../../components/ScreenGlobal';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import { InputArea, InputText } from '../../components/ScreenGlobal/styles';
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
    const navigator = useNavigation();
    const { darkMode } = useContext(UserContext);

    const [location, setLocation] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [listExperts, setListExperts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // BUSCAR POR LOCALIZAÇÃO DO USUÁRIO
    const handleLocationFinder = async () => {
        setShowLoading(true);
        const { status } = await Location.requestPermissionsAsync();
        if (status === 'granted') {

            setLocation('');

            const currentPosition = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            const currentLocation = await Location.reverseGeocodeAsync({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
            });
            setLocation(currentLocation[0].region);

            getExperts(currentLocation[0].region);

        } else {
            alert('Acesso a localização do dispositivo negada');
        }

        setShowLoading(false);
    };

    // PESQUISAR LOCALIZAÇÃO
    const handleLocationSearch = () => {
        setShowLoading(true);
        getExperts(location);
        setShowLoading(false);
    };

    //RETORNA A LISTA DE TÉCNICOS BASEADO NA LOCALIZAÇÃO
    const getExperts = async (locationParam = 'São Paulo') => {
        setListExperts([]);
        setShowLoading(true);
        try {
            const response = await Api.getExpertsByLocation(locationParam);
            // console.log(response);
            if (response.length > 0) {
                setLocation(response[0].location);
                setListExperts(response);
            } else {
                alert("Experts não encontrados...");
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setShowLoading(false);
        }
    };

    // REFRESH DA TELA
    const onRefresh = () => {
        setRefreshing(true);
        getExperts(location.length > 0 ? location : 'São Paulo');
        setRefreshing(false);
    };

    useEffect(() => {
        getExperts();
    }, []);

    return (
        <Screen>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <HeaderArea>
                    <HeaderText numberOfLines={2}>Encontre o melhor Expert da região</HeaderText>
                    <SearchButton onPress={() => navigator.navigate("Search")}>
                        <SearchIcon width="26" height="26" fill="#fff" />
                    </SearchButton>
                </HeaderArea>

                <InputArea darkMode={darkMode}>
                    <InputText
                        placeholder="Onde você está?"
                        placeholderTextColor="#fff"
                        value={location}
                        onChangeText={t => setLocation(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#fff" />
                    </LocationFinder>
                </InputArea>

                {showLoading && <LoadingIcon size="large" color="#fff" />}

                <ListArea>
                    {/* {listExperts.length > 0 && <Text>{listExperts[0].name}</Text>} */}
                    {listExperts.length > 0 && listExperts.sort(() => .5 - Math.random()).map((item, key) => {
                        return <ExpertItem key={`expert__${key}`} data={item} />;
                    })}
                </ListArea>

            </Scroller>
        </Screen>
    );
};
export default Home;
Home.displayName = 'Home';
