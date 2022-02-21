import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset} from '../../features/auth/authSlice'
import { useEffect } from 'react'

function Login() {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [userData, setUserData] = useState({
        email: "",
        password:"",
    })
    
    const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth)
    const {email, password} = userData

    const onChange = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    const registerLink = () => {
        navigate('/register')
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

  return (   
        <div className="container-log">
            <div className="register-form">
                <form action="submit" onSubmit={onSubmit}>
                    <div className="form-header">
                        <h1>Bejelentkezés</h1>
                    </div>
                    <div className="body">                        
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
                        <div className="footer">
                            <button type='submit'>Bejelentkezés</button>
                            <p onClick={registerLink}>Még nem regisztráltam!</p>
                        </div>
                    </div>
                </form>
            </div>  
        </div>   
)}



export default Login
