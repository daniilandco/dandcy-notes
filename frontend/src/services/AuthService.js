import $api from "../http"

class AuthService {
    static CRED_ITEM = 'user'

    static async login(username, password) {
        try {
            const response = await $api.post('/auth/login/', {username, password})
            return await response.data
        } catch (e) {
            return {isError: true, errors: e.response.data}
        }
    }

    static async register(email, username, password) {
        try {
            const response = await $api.post('/auth/users/', {email, username, password})
            return await response.data
        } catch (e) {
            return {isError: true, errors: e.response.data}
        }
    }

    static async logout() {
        localStorage.removeItem('user');
        return $api.post('/auth/logout/')
    }

    static getCurrentUserID() {
        return localStorage.getItem('userID')
    }
}

export default AuthService