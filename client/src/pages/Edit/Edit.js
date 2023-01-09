import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
  const [product, setProduct] = useState()
  const { pathname } = useLocation();   
  const URL = `http://localhost:8080/products/${pathname.split('/')[3]}`

  const navigate = useNavigate()

  const [newProducts, setNewProducts] = useState({
    _id: URL,
    name: '',
    description: '',
    category: '',
    price: '',
    code: '',
    stock: '',
    thumbnail: ''
  })

  // Expresiones regulares para los campos del formulario
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,25}$/i  // eslint-disable-next-line
  const priceRegex = /^[0-9]{1,20}$/i // eslint-disable-next-line
  const stockRegex = /^[0-9]{1,20}$/i // eslint-disable-next-line

  const handleChange = (e) => {
    setNewProducts({
      ...newProducts,
      [e.target.name]: e.target.value
    })
  }


  useEffect(() => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: URL
    })
    .then(res => {
      setProduct(res.data)
    })
    .catch(err => console.log(err))
  }, [URL])



  const handleEditProduct = (e) => {
    e.preventDefault()
    axios({
      method: 'PUT',
      withCredentials: true,
      url: URL,
      data: newProducts
    })
    .then(res => {
      if (res.status === 200) {
        alert('Producto editado')
        navigate('/admin')
      }
    })
    .catch(err => console.log(err))
  }
  

  
  return (
    <div className="sectionContainer">
      {product &&
        <div className="formulario">				
          <form className="form">
            <legend>EDITAR PRODUCTO</legend>                    
            <div className="form-group">
              <label htmlFor="name">ID</label>						
              <input type="text" name="_id" id="id" value={product._id} readOnly/>						
            </div>
            <div className="form-group">
              <label htmlFor="name">NOMBE</label>
              <input type="text" className="form-control" name="name" id="name" placeholder={product.name} required onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="precio">PRECIO</label>
              <input type="text" className="form-control" name="price" id="precio" placeholder={product.price} required onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="precio">CODIGO</label>
              <input type="text" className="form-control" name="code" id="code" placeholder={product.code} required onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="precio">DESCRIPCION</label>
              <input type="text" className="form-control" name="description" id="description" placeholder={product.description} required onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="precio">CATEGORIA</label>
              <input type="text" className="form-control" name="category" id="category" placeholder={product.category} required onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="precio">STOCK</label>
              <input type="text" className="form-control" name="stock" id="stock" placeholder={product.stock} required onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="thumbnail">THUMBNAIL</label>
              <input type="thumbnail" className="form-control" name="thumbnail" id="thumbnail" placeholder={product.thumbnail} required onChange={handleChange}/>                        
            </div>
                         
            <div className="form-button">
              {nameRegex.test(newProducts.name) && priceRegex.test(newProducts.price) && stockRegex.test(newProducts.stock) && newProducts.category && newProducts.code && newProducts.thumbnail !== '' && newProducts.description 
                ? <button type="submit" className="addBtn" onClick={handleEditProduct}>EDITAR</button> 
                : <button type="submit" className="addBtnDsbl" disabled>EDITAR</button>}              
            </div> 
          </form>
        </div>
      }
      <div className="linkContainer"><Link to="/">VOLVER A HOME</Link></div>
    </div>
  )
}

export default Edit