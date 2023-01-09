import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../context/userContext"

const Cart = ({cart}) => {

  const {deleteFromCart, sendOrder, deleteAllFromCart} = useContext (UserContext)



  const handleDelete = async (cartId, productId) => {
    await deleteFromCart(cartId, productId)   
  } 

  const handleSendOrder = async () => {    
    await sendOrder()
  }

  const handleEmptyCart = async () => {
    await deleteAllFromCart(cart._id)
    alert('Carrito vaciado')
  }


  return (
    <div className='cart'>   
    {cart 
    ?  
      <>
      {/* table with products */}
      <div className="cartTable">
        <div className="cartTableHead">          
          <h3>Producto</h3>
          <h3>Descripcion</h3>
          <h3>Precio</h3> 
          <h3>Cantidad</h3>
          <h3>Total</h3> 
          <h3>Eliminar</h3> 
        </div>        

        <div className="cartTableBody">
          {cart.products.map((product, i)  => {
            return (
              <div className='tableDetail' key={i}>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>{product.quantity}</p>
                <p>${product.price * product.quantity}</p>
                {/* <p>{product.quantity}</p>
                <p>{product.price * product.quantity}</p>  */}
                <p onClick={() => handleDelete(cart._id, product._id)} className='deleteBtn'>X</p>
              </div>       
                      
            )
          })}  
        </div>              
      </div>
      <div className="emptyCart">
        <button onClick={handleEmptyCart}>Vaciar Carrito</button>
      </div>      
      <div className="cartButtonContainer">
        <button onClick={handleSendOrder}>Finalizar Compra</button>
      </div>      
      </>
      :
      <Link to ="/login">Por Favor Inicie Sesión</Link>
    }
    </div>
  )
}

export default Cart