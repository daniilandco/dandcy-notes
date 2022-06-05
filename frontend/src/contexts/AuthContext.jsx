import React, {useContext, useEffect, useState} from 'react'
import AuthService from '../services/AuthService'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    const register = async (email, username, password) => {
        return await AuthService.register(email, username, password)
    }

    const login = async (username, password) => {
        const response = await AuthService.login(username, password)

        if (!response?.isError) {
            localStorage.setItem('userID', response.user.id)
            localStorage.setItem('token', response.token)
            setCurrentUser(response.user)
        }

        return response
    }

    const logout = () => {
        AuthService.logout().then(_ => {
            localStorage.removeItem('userID')
            localStorage.removeItem('token')
        })
        setCurrentUser(null)
    }

    const value = {
        currentUser,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
