import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/userContext"
import { Link } from "react-router-dom"
import "./header.css"
import CartIcon from "../CartIcon/CartIcon"

 

const Header = () => {

  
  const [userData, setUserData] = useState(null)
  const [cartData, setCartData] = useState(null)
  
  const { user, cart } = useContext(UserContext)

  useEffect(() => {
    setUserData(user)
    setCartData(cart)
    // eslint-disable-next-line
  }, [cart])    


  return (
    <header id="header" className="divContainer">
      {userData 
        ?
          <div className="header">
            <p>Bienvenido {userData.username}</p>
            {cartData && 
              <div>              
                <CartIcon cart={cartData}/>
                {userData.username && 
                  <Link to ="/profile"><img src={`http://localhost:8080/profileImages/${userData.image}`} alt="user thumbnail" className="userImg"/></Link>
                }
              </div>        
            }        
          </div>
        :
        <div className="userHeader">
          <p>Por favor Inicie Sesión</p>
        </div>
      }   

    </header>
  )
}

export default Header