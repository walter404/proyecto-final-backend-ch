import MemoriaContainer from "../../MemoriaContainer.js";
import {carts} from '../../../dataBase/memoria.js';

class CartContainer extends MemoriaContainer {
  constructor () {
    super(carts) 
  }

  async save(userId, username, email, direccion) {    
    let obj = {userId, username, email, direccion, products: []}
    const data = await super.save(obj)
    return data      
  }
 
  async addProduct(idCart, product) {     

    try {  

      const arr = await super.list()    

      let indexCart = arr.findIndex(el => el._id == idCart) //en mongo el id se guarda en _id      

      arr[indexCart].products.push(product)       
      const data = await super.changeById(idCart, arr[indexCart])
      return data                        
    } 
    catch (err) {      
      throw new Error('Error de escritura', err)
    }  
  } 
   
  async deleteProduct(idCart, idProduct) {
    try {
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 
  
      let indexCart = arr.findIndex(el => el._id == idCart) 
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }        
      
      let indexProduct = arr[indexCart].products.findIndex(el => el._id == idProduct) 
      if (indexProduct == -1) {
        return ({ error: 'Producto no encontrado' })
      }   
      
      arr[indexCart].products.splice(indexProduct, 1)   
      

      await super.changeById(idCart, arr[indexCart])
      return "Producto Eliminado"
    } 
    catch (err) {
      throw new Error('Error de escritura', err)
    }
  }

  async updateProduct(idCart, idProduct, quantity) {
    try {
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})}

      let indexCart = arr.findIndex(el => el._id == idCart) 
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }

      let indexProduct = arr[indexCart].products.findIndex(el => el._id == idProduct) 
      if (indexProduct == -1) {
        return ({ error: 'Producto no encontrado' })
      }

      /* le sumo la cantidad */
      arr[indexCart].products[indexProduct].quantity += quantity

      await super.changeById(idCart, arr[indexCart])
      return "Producto Actualizado"
    }
    catch (err) {
      throw new Error('Error de escritura', err)
    }
  }
  

  async deleteAllProducts(idCart) {
    try {
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 
  
      let indexCart = arr.findIndex(el => el._id == idCart) 
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }        
      
      arr[indexCart].products = []   
      await super.changeById(idCart, arr[indexCart])
      return "Productos Eliminados"
    } 
    catch (err) {
      throw new Error('Error de escritura', err)
    }
  }


  
}

export {CartContainer}


