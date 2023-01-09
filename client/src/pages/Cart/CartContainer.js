import './cart.css'
import { useContext } from 'react'
import UserContext from '../../context/userContext'
import Cart from './Cart'
import { Link } from 'react-router-dom'

const CartContainer = () => {
  const { cart } = useContext(UserContext)


  return (
    <div className='sectionContainer cartContainer'>
      <h2>DETALLE DE CARRITO</h2>
      {cart && cart.products.length > 0
        ?
        <Cart cart={cart}/>
        :
        <p>No hay productos en el carrito</p>
      }  
      <div className="linkContainer"><Link to="/">VOLVER A HOME</Link></div>     

    </div>
  )
}

export default CartContainer