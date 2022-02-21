import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import loguot from './img/9032192_logout_application_system_website_social media_icon.png'
import login from './img/5340287_man_people_person_user_users_icon.png'

function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = (e) => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='goods'>
        <Link to="/">Bevásárlólista</Link>
      </div>
      <ul>
        {user ? (
          <li onClick={onLogout} >
              <img className='rotate' src={loguot} alt="logout" />
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <img src={login} alt="Login" />
              </Link>
            </li>
          </>
        )}
        
      </ul>
    </header>
  )
}

export default Header