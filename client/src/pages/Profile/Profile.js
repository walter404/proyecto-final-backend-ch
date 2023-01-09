import { useContext } from 'react'
import UserContext from '../../context/userContext'
import './profile.css'
import Logout from '../../components/Logout/Logout'
import { Link } from 'react-router-dom'

const Profile = () => {
  const {user} = useContext (UserContext)

  return (       
    <div className='sectionContainer'>
      <div id="infoUserContainer">
        {user
          ?
          <>
          <img src={`http://localhost:8080/profileImages/${user.image}`} alt="User"/>
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <p>Telefono: {user.telefono}</p>
          <p>Direccion: {user.direccion}</p>
          <p>Edad: {user.edad}</p>
          <p>ID: {user._id}</p>	
          <button><Link to ="/orders">Ver Ordenes Realizadas</Link></button>          
          <Logout/> 
          </>
          :
          <Link to ="/login">Por Favor Inicie Sesión</Link>
        }
        <div className="linkContainer"><Link to="/">VOLVER A HOME</Link></div>
			</div>
    </div>
  )
}

export default Profile