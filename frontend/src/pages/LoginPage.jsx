import {Link, useNavigate} from "react-router-dom"
import useInput from "../hooks/useInput"
import {useAuth} from "../contexts/AuthContext"
import {useState} from "react"
import React from 'react'

const LoginPage = () => {

    const [error, setError] = useState('')
    const username = useInput('')
    const password = useInput('')
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
        }

        const response = await login(username.value, password.value)

        if (await response?.isError) {
            const errors = new Map(Object.entries(await response.errors));
            setError(await errors.values().next().value)
        } else {
            navigate('/notes')
        }
    }


    return (
        <div className='register-page'>
            <div className={'register-page-wrapper'}>
                <div className='register-page-label'>Log In</div>
                <div>
                    <form className='register-form' onSubmit={handleSubmit}>
                        <span className="validation-error">{error}</span>
                        <div className={'auth-field'}>
                            <input {...username} type={'text'} placeholder={'Enter Username'} required={true}/>
                        </div>
                        <div className={'auth-field'}>
                            <input {...password} type={'password'} placeholder={'Enter Password'} required={true}/>
                        </div>
                        <button type={'submit'} className={'register-btn-up'}>Log In</button>
                    </form>
                </div>
                <div className='register-btn-in'>
                    <span>Don't have an account yet?</span>
                    <Link to={'/register'}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;