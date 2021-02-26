import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
//import Geolocation from '@react-native-community/geolocation';
//import { request, PERMISSIONS } from 'react-native-permissions';
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

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
    const navigator = useNavigation();
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

            getExperts();

        } else {
            alert('Acesso a localização do dispositivo negada');
        }

        setShowLoading(false);
    };

    // PESQUISAR LOCALIZAÇÃO
    const handleLocationSearch = () => {
        setShowLoading(true);
        getExperts();
        setShowLoading(false);
    };

    //RETORNA A LISTA DE TÉCNICOS BASEADO NA LOCALIZAÇÃO
    const getExperts = async () => {
        setListExperts([]);
        setShowLoading(true);
        try {
            const locationParam = location != '' ? location : 'São Paulo';
            const response = await Api.getExpertsByLocation(locationParam);
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
        getExperts();
        setRefreshing(false);
    };

    useEffect(() => {
        getExperts();
    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <HeaderArea>
                    <HeaderText numberOfLines={2}>Encontre o melhor Expert da região</HeaderText>
                    <SearchButton onPress={() => navigator.navigate("Search")}>
                        <SearchIcon width="26" height="26" fill="#fff" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está?"
                        placeholderTextColor="#fff"
                        value={location}
                        onChangeText={t => setLocation(t)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#fff" />
                    </LocationFinder>
                </LocationArea>

                {showLoading && <LoadingIcon size="large" color="#fff" />}

                <ListArea>
                    {/* {listExperts.length > 0 && <Text>{listExperts[0].name}</Text>} */}
                    {listExperts.length > 0 && listExperts.sort(() => .5 - Math.random()).map((item, key) => {
                        return <ExpertItem key={`expert__${key}`} data={item} />;
                    })}
                </ListArea>

            </Scroller>
        </Container>
    );
};
