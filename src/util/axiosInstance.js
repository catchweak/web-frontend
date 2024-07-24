import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ' '
    }
});

export default instance;
