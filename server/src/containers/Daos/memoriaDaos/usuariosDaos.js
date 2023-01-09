import MemoriaContainer from "../../MemoriaContainer.js";
import {users} from '../../../dataBase/memoria.js';
import bcrypt from "bcrypt";

class UserContainer extends MemoriaContainer {
  constructor() {
    super(users);
  }

  async save(obj) { //sobreescribo el metodo save de la clase padre para verificar que no exista el usuario

    try {
      /* verificar si existe un usuario con mismo mail */
      const users = await this.list();
      const userExist = users.find(user => user.email === obj.email); 
      if (userExist) { //si el usuario existe
        return false; //devuelvo false
      } else { //si el usuario no existe
        const hashPass = await bcrypt.hash(obj.password, 8) //encripto la contraseña
        obj.password = hashPass; //guardo la contraseña encriptada en el usuario
        const data = await super.save(obj); //guardo el usuario en la base de datos  
        console.log(users);          
        return data; //devuelvo el usuario
      }      
    } catch (error) {
      console.log(error);
    }

  }

  async findByEmail (email) {
    try {
      const users = await this.list();
      const userExist = users.find(user => user.email === email); //busco si el usuario ya existe en la base de datos
      if (userExist) { //si el usuario existe
        return userExist; 
      } else { //si el usuario no existe
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }


}

export {UserContainer};
 

