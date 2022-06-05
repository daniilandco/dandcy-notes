import React from 'react'
import {useAuth} from "../contexts/AuthContext"
import {useNavigate} from "react-router-dom"

const Header = () => {

    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="app-header">
            <h1>Dandcy Notes</h1>
            <button onClick={handleLogout}> Sign Out</button>
        </div>
    )
}

export default Header;