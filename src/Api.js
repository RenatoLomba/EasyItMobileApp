import AsyncStorage from '@react-native-community/async-storage';
import { FileSystem } from 'react-native-unimodules';

const BASE_API = 'https://easyit-api-node.herokuapp.com/';
// const BASE_API = 'http://localhost:3333/';

class Api {
    async signIn(email, password) {
        const req = await fetch(`${BASE_API}users/login`, {
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
        const req = await fetch(`${BASE_API}users`, {
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
    async loginByToken(token) {
        const req = await fetch(`${BASE_API}users/token`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
        const res = await req.json();
        return res;
    }
    async getExperts() {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async getExpertsByLocation(location) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts?location=${location}`, {
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
        const req = await fetch(`${BASE_API}experts/${id}`, {
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
        const req = await fetch(`${BASE_API}appointments`, {
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
    async searchService(name) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}experts/services/${name}`, {
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
        const req = await fetch(`${BASE_API}appointments/${id}`, {
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
        const req = await fetch(`${BASE_API}favorites`, {
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
    async removeFavorite(expertId, userId) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}favorites/${expertId}/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const json = await req.json();
        return json;
    };
    async isFavorite(expertId, userId) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}favorites/${expertId}/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const res = await req.json();
        return res;
    };
    async registerTestimonial(userId, expertId, description, stars) {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}testimonials`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({userId, expertId, description, stars})
        });
        const res = await req.json();
        return res;
    };
    async uploadUserAvatar(userId, uri) {
        const token = await AsyncStorage.getItem('token');

        const response = await FileSystem.uploadAsync(`${BASE_API}avatars/user`, uri, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            },
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'avatar',
            parameters: { 'userId': String(userId) }
        });
        const json = JSON.parse(response.body);
        return json;
    }
    // async uploadUserAvatar(userId, base64 = '', uri= '') {
    //     try {
    //         // const base64string = `data:image/jpg;base64,${base64}`

    //         await FileSystem.deleteAsync(uri)
    //         // await FileSystem.uploadAsync()

    //         const data = {
    //             [String(userId)]: {
    //                 avatar: uri
    //             }
    //         }

    //         console.log(data)

    //         await AsyncStorage.setItem(`userAvatar`, JSON.stringify(data))
    //         return { success: true, data };
    //     } catch (err) {
    //         return { error: err.message }
    //     }
    // }
    async getUserAvatar(userId) {
        try {
            const data = await AsyncStorage.getItem(`userAvatar`)

            const json = JSON.parse(data)

            return { success: true, data: json[userId] };
        } catch (err) {
            return { error: err.message }
        }
    }
}

export default new Api();
