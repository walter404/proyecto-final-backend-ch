import axios from 'axios'
import { Link } from "react-router-dom"


const AdminProduct = ({product, reloadProducts}) => {    
  
  const handleDeleteProduct = () => {
    axios({
      method: 'DELETE',
      withCredentials: true,
      url: `http://localhost:8080/products/${product._id}`
    })  
    .then(res => {
      if (res.status === 200) {
        alert('Producto eliminado')
        reloadProducts()
      }
    })
    .catch(err => console.log(err))   
  }
  
  return (
    <div className="productContainer">
      
      <img src={product.thumbnail} alt={product.name}/>
      <div className="productInfo">
        <h3>{product.name}</h3>
        <p>ID: {product._id}</p>
        <p>Precio: ${product.price}</p>    
        <p>Stock: {product.stock}</p>    
        <p>Categoría: {product.category}</p>
        <p>Descripcio: {product.description}</p>
      </div>
      <div className="adminButtons">    
        <button className='editBtn'> <Link to={`/products/edit/${product._id}`}>Editar</Link></button>
        <button onClick={handleDeleteProduct}className='dtlBtn'>Eliminar</button>
      </div>
      
    </div>
    
  )
}

export default AdminProduct