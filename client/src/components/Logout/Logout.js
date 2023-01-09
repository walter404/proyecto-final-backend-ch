import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/userContext'
import './logout.css'



const Logout = () => {

  const {logout} = useContext (UserContext)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()   
    alert('Usuario Deslogueado')
    navigate('/login')
    
  }

  return (
    <button className="logout" onClick={handleLogout}>Logout</button>
  )
}

export default Logout