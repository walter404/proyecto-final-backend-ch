import { useContext } from "react"
import { Link } from "react-router-dom"
import ProductsContainer from "../../components/Products/ProductsContainer"
import UserContext from "../../context/userContext"
import "./home.css"

const Home = () => {  
  const {user} = useContext (UserContext)

  return (
    <div className="sectionContainer home">
      
      {user
        ?
          <>
            <ProductsContainer/> 
            {user.username === 'Eneas' && <div className="linkContainer"><Link to ="/admin">IR A PANLE ADMINISTRADOR</Link> </div>}
          </>
        :
          <>
            <div className="authContainer">
              <Link to ="/login">Iniciar Sesión</Link>
              <Link to ="/register">Registrarse</Link>
            </div>
          </>
      }  
            
    </div>    
  )
}

export default Home