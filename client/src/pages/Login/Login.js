import { useContext, useState } from "react"
import axios from "axios"
import "./login.css"
import UserContext from "../../context/userContext"
import { Link, useNavigate } from "react-router-dom"

const URL = 'http://localhost:8080/auth/login'


const Login = (props) => {
  const {login} = useContext (UserContext)
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email:"",
    password:""    
  })

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name] : event.target.value
    })
  } 
 
  const handleSubmit =  (event) => {
    event.preventDefault()
    //post with axios and save the cookie
    axios({
      method: "POST",
      origin: "http://localhost:3000",
      data: user,
      withCredentials: true,
      url: URL           
    })
    .then(async res => {
      /* if error */
      if (res.status === 200) {                      
        login()         
        navigate('/')
      }    
    })  
    .catch(err => {
      alert('error de logueo')
      console.log('error de logueo', err)
  })      
  }    

  return (
    <div className="sectionContainer formulario">      
      <form className="form">
        <legend>LOGIN USUARIO</legend>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input type="text" name="email" placeholder="Email" onChange={handleInputChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange}/>
        </div>
        <button onClick={handleSubmit} className='form-button'>LOGIN</button>        
      </form>
      <div className="linkContainer"><Link to="/register">REGISTRARSE</Link></div>
    </div>
  )
}

export default Login