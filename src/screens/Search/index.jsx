import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import {
    Container,
    Scroller,
    Header,
    HeaderText,
    SearchArea,
    SearchTextInput,
    SearchButton,
    LoadingIcon,
    OrderByArea,
    OrderByButton,
    OrderByButtonText,
    ListArea
} from './styles';
import Api from '../../Api';
import ExpertItem from '../../components/ExpertItem';

import SearchIcon from '../../assets/search.svg';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [services, setServices] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [take, setTake] = useState(10);

    const disponibleOrders = [
        { text: 'Nome', value: 'name' },
        { text: 'Avaliação', value: 'stars' },
        { text: 'Mais antigos', value: 'olds' }
    ];

    const searchServices = async () => {
        setShowLoading(true);
        try {
            const servicesResult =
                await Api.searchService(searchText === '' ? ' ' : searchText, take, selectedOrder === '' ? 'default' : selectedOrder);
            setServices(servicesResult);
        } catch (err) {
            alert(err.message);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        searchServices();
    }, []);

    useEffect(() => {
        searchServices();
    }, [selectedOrder]);

    const handleSearchButton = () => searchServices();

    return (
        <Container>
            <Scroller>
                <SearchArea>
                    <SearchTextInput
                        placeholder="Digite algum serviço..."
                        placeholderTextColor="#fff"
                        value={searchText}
                        onChangeText={t => setSearchText(t)}
                    />
                    <SearchButton onPress={handleSearchButton}>
                        <SearchIcon width="26" height="26" fill="#fff" />
                    </SearchButton>
                </SearchArea>

                <OrderByArea>
                    {disponibleOrders.map((order, key) => {
                        return (
                            <OrderByButton
                                key={`order__${key}`}
                                style={{
                                    backgroundColor: selectedOrder === order.value ? '#fff' : '#FF9200'
                                }}
                                onPress={() => setSelectedOrder(order.value)}
                            >
                                <OrderByButtonText
                                    style={{ color: selectedOrder === order.value ? '#FF9200' : '#fff' }}
                                >{order.text}</OrderByButtonText>
                            </OrderByButton>
                        )
                    })}
                </OrderByArea>

                <ListArea>
                    {showLoading && <LoadingIcon size="large" color="#fff" />}
                    {services.length > 0 && services.map((service, key) => {
                        if (key !== 0 && services[key - 1].expertId === service.expertId) {
                            return <View key={key}></View>;
                        }
                        return <ExpertItem key={`expert__${key}`} data={service.expert} />;
                    })}
                </ListArea>
            </Scroller>
        </Container>
    );
};
export default Search;
Search.displayName = 'Search';
