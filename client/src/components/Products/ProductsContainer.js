import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AddProduct from "../../pages/Admin/AddProduct"
import Error from "../Error/Error"
import AdminProduct from "./AdminProduct"
import Product from "./Product"
import "./products.css"

const URL = "http://localhost:8080/products"

const ProductsContainer = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState([])
  const [error, setError] = useState(false)

  const { pathname } = useLocation()
 
  useEffect(() => {    
    axios({
      method: "GET",      
      withCredentials: true,
      url: URL
    })
    .then(res => {
      setProducts(res.data)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setError(true)
    })
     
  }, [])

  useEffect(() => {
    const arr = []
    /* solo agregar categorias no repetidas */
    products.forEach(product => {
      if (!arr.includes(product.category)) {
        arr.push(product.category)
      }
    })
    setCategory(arr)
  }, [products])

  const reloadProducts = () => {
    axios({
      method: "GET",
      origin: "http://localhost:3000",
      withCredentials: true,
      url: URL
    })
    .then(res => {
      setProducts(res.data)
      setLoading(false)
    })    
    .catch(err => {
      console.log(err)
      setError(true)
    }) 
  }  


  return (
    <>
      {error && <Error error="Error al cargar los productos"/>}
      <div className="productsContainer">
        {loading
          ?
            <h1>Cargando...</h1>
          :     
            pathname === "/admin"   
            ? 
              <>
                {products.map(product => <AdminProduct key={product._id} product={product} reloadProducts={reloadProducts} />)}
                <AddProduct reloadProducts={reloadProducts}/>        
              </>
            :
              <>
                <div className="linkTocat">
                  {category.length > 0 && category.map((category, index) => <Link to={`/category/${category}`} key={index}>{category.toUpperCase()}</Link>)}

                </div>
                {products.map(product => <Product key={product._id} product={product} />)}
              </>          
                      

        }
      </div>
    </>
  )
}

export default ProductsContainer