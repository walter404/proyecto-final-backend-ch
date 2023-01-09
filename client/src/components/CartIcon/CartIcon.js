import { Link } from "react-router-dom"

const CartIcon = ({cart}) => {
  return (
    <div className="cartIconDiv">
      <Link to="/cart">
        <p className="cartCounter">{cart.products.length}</p>
        <img src="/images/cart.svg" alt="cart icon" className="cartIcon"/>
      </Link>
    </div>
  )
}

export default CartIcon