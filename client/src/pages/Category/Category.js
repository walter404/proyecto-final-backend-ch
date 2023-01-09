import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Product from "../../components/Products/Product";


const Category = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const { pathname } = useLocation();  

  const URL = `http://localhost:8080/products/category/${pathname.split('/')[2]}`  

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
    .catch(err => console.log(err)) 
  }, [URL]) 




  return (
    <div className="sectionContainer home">
      <div className="productsContainer">
        {loading
          ?
            <h1>Cargando...</h1>
          :   
            products.map(product => <Product key={product._id} product={product} />)
        }
      </div>
      <div className="linkContainer"><Link to="/">VOLVER A HOME</Link></div>
    </div>
  )
}

export default Category