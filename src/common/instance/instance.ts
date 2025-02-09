import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: 'Bearer 58249b0a-b8fd-46ff-aedb-3ed66a90a743',
        'API-KEY': '1f899b25-ea32-4422-868d-0e025508e3bf'
    }
})