import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://192.168.0.27:5000/api/';
// 192.168.15.132 --> SEEGER
// 192.168.0.27 --> OSVALDO
// 192.168.0.102 --> CASA

export default {
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}sign/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}sign/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await req.json();
        return json;
    },
    getExpertsByLocation: async (location) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts/location/${location}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    },
    getExpertComplete: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts/complete/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    },
    registerAppointment: async (appointmentDTOCreate) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}appointments/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(appointmentDTOCreate)
        });
        const json = await req.json();
        return json;
    },
    searchService: async (name, qtd, order) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}services/name/${name}/${qtd}/${order}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    }
};
