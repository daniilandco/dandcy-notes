import React, {useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
import './AuthPages.css'
import useInput from "../hooks/useInput"
import {useAuth} from "../contexts/AuthContext"

const RegisterPage = () => {
    const [error, setError] = useState('')

    const email = useInput('')
    const username = useInput('')
    const password = useInput('')

    const navigate = useNavigate()

    const {register} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await register(email.value, username.value, password.value)

        if (await response?.isError) {
            const errors = new Map(Object.entries(await response.errors));
            setError(await errors.values().next().value)
        } else {
            navigate('/login')
        }

    }

    return (
        <div className='register-page'>
            <div className={'register-page-wrapper'}>
                <div className='register-page-label'>Sign Up</div>
                <div>
                    <form className='register-form' onSubmit={handleSubmit}>
                        <span className="validation-error">{error}</span>
                        <div className={'auth-field'}>
                            <input {...email} type={'email'} placeholder={'Enter E-mail'} required={true}/>
                        </div>
                        <div className={'auth-field'}>
                            <input {...username} type={'text'} placeholder={'Enter Username'} required={true}/>
                        </div>
                        <div className={'auth-field'}>
                            <input {...password} type={'password'} placeholder={'Enter Password'} required={true}/>
                        </div>
                        <button type={'submit'} className={'register-btn-up'}>Sign Up</button>
                    </form>
                </div>
                <div className='register-btn-in'>
                    <span>Already have an account?</span>
                    <Link to={'/login'}>Sign In</Link>
                </div>
            </div>
        </div>
    )

}

export default RegisterPage