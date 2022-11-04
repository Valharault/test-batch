import axios from 'axios';

class AuthApi {
    login(code) {
        return axios.post('http://localhost:8000/api/auth/login/'+code, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

export default new AuthApi();
