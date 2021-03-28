import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://192.168.0.30:5000/api/';
// 192.168.15.132 --> SEEGER
// 192.168.0.30 --> OSVALDO
// 192.168.0.2 --> ANDREIA
// 192.168.0.102 --> CASA

class Api {
    async signIn(email, password, authenticated = false) {
        const req = await fetch(`${BASE_API}sign/signin?authenticated=${authenticated}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        const json = await req.json();
        return json;
    };
    async signUp(name, email, password) {
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
    };
    async getExpertsByLocation(location) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts/location/${location}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async getExpertComplete(id) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts/complete/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async registerAppointment(appointmentDTOCreate) {
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
    };
    async searchService(name, qtd, order) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}services/name/${name}/${qtd}/${order}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async removeAppointment(id) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}appointments/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async addFavorite(userId, expertId) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}favorites/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({userId, expertId})
        });
        const json = await req.json();
        return json;
    };
    async removeFavorite(id) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}favorites/delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async isFavorite(userId, expertId) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}favorites/findrelation/${userId}/${expertId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const res = req.status !== 404 ? await req.json() : false;
        return res;
    };
    async registerTestimonial(userId, expertId, description, stars) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}testimonials/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({userId, expertId, description, stars})
        });
        const res = req.status === 200 ? await req.json() : await req.text();
        return res;
    };
}

export default new Api();
