import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {register, reset} from '../../features/auth/authSlice'
import { useEffect } from 'react'

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)
    
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password:"",
        password2:""
    })
    
    const {name, email, password, password2} = userData

    const onChange = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Passwords do not match!')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    const loginLink = () => {
        navigate("/login")
    }

  return (   
        <div className="container-reg">
            <div className="register-form">
                <form action="submit" onSubmit={onSubmit}>
                    <div className="form-header">
                        <h1>Regisztráció</h1>
                    </div>
                    <div className="body">
                        <label htmlFor="name">Felhasználó név:</label>
                        <input 
                            type="text" 
                            value={name} 
                            placeholder="Név" 
                            name="name" 
                            id='name' 
                            onChange={onChange} />
                        <label htmlFor="email">Email cím:</label>
                        <input 
                            type="email" 
                            value={email} 
                            placeholder="E-mail cím"
                            name="email" 
                            id="email" 
                            onChange={onChange} />
                        <label htmlFor="password">Jelszó:</label>
                        <input 
                            type="password" 
                            value={password} 
                            placeholder="Jelszó" 
                            name="password" 
                            id="password" 
                            onChange={onChange} />
                        <label htmlFor="password2">Jelszó megerősítése:</label>
                        <input 
                            type="password" 
                            placeholder='Jelszó'
                            value={password2} 
                            name="password2" 
                            id="password2" 
                            onChange={onChange} />
                        <div className="footer">
                            <button type='submit'>Regisztrálás</button>
                            <p onClick={loginLink}>Már regisztráltam!</p>
                        </div>
                    </div>
                </form>
            </div>  
        </div>   
)}



export default Register
