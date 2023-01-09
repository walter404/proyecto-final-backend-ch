import { useState } from "react"
import axios from "axios" 


const AddProduct = ({reloadProducts}) => {    

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    code: '',
    thumbnail: '',
    price: '',
    stock: ''
  })

  // Expresiones regulares para los campos del formulario
  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,25}$/i  // eslint-disable-next-line
  const priceRegex = /^[0-9]{1,20}$/i // eslint-disable-next-line
  const stockRegex = /^[0-9]{1,20}$/i // eslint-disable-next-line


  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {    
    e.preventDefault()    
    axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:8080/products',
      data: product
    })
    .then(res => {
      console.log(res)
      alert('Producto agregado')
      /* refresh form */      
      document.getElementById('name').value = ''
      document.getElementById('description').value = ''
      document.getElementById('category').value = ''
      document.getElementById('code').value = ''
      document.getElementById('thumbnail').value = ''
      document.getElementById('precio').value = ''
      document.getElementById('stock').value = ''  

      reloadProducts()
      
    })
    .catch(err => console.log(err))
  }


  return (
    <div className="addFormulario">				
      <form className="form" onSubmit={handleSubmit}>
        <legend>AGREGAR PRODUCTO</legend>                    
        <div className="form-group">
          <label htmlFor="name">NOMBE</label>
          <input type="text" className="form-control" name="name" id="name" placeholder="Nombre de Producto" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="precio">PRECIO</label>
          <input type="text" className="form-control" name="price" id="precio" placeholder="Precio del Producto" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="precio">CODIGO</label>
          <input type="text" className="form-control" name="code" id="code" placeholder="Codigo del Producto" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="precio">DESCRIPCION</label>
          <input type="text" className="form-control" name="description" id="description" placeholder="Descripcion del Producto" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="precio">CATEGORIA</label>
          <input type="text" className="form-control" name="category" id="category" placeholder="Categoria del Producto" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="precio">STOCK</label>
          <input type="text" className="form-control" name="stock" id="stock" placeholder="Stock del Producto" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">THUMBNAIL</label>
          <input type="thumbnail" className="form-control" name="thumbnail" id="thumbnail" placeholder="url de la Imagen" required onChange={handleChange}/>
        </div>             
        <div className="form-button">
          {nameRegex.test(product.name) && priceRegex.test(product.price) && stockRegex.test(product.stock) && product.category && product.code && product.thumbnail && product.description 
          ? <button type="submit" className="addBtn">AGREGAR</button> 
          : <button type="submit" className="addBtnDsbl" disabled>AGREGAR</button>}          
        </div> 
      </form>
    </div>	

  )
}

export default AddProduct