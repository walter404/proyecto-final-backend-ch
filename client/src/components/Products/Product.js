import { Link } from "react-router-dom"


const Product = ({product}) => {  
  
  return (
    <div className="productContainer">
      
      <img src={product.thumbnail} alt={product.name}/>
      <div className="productInfo">
        <div>
          <h3>{product.name}</h3>
          <p>${product.price}</p>        
        </div>
        <p>{product.description}</p>
      </div>
      <button className="toDetail"><Link to={`/products/${product._id}`}>VER DETALLE</Link></button>      
    </div>
    
  )
}

export default Product