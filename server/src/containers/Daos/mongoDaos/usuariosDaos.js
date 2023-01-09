import MongoContainer from "../../MongoContainer.js";
import {User} from "./models/User.js";
import bcrypt from "bcrypt";

class UserContainer extends MongoContainer {
  constructor() {
    super(User);
  }

  async save(obj) { //sobreescribo el metodo save de la clase padre para verificar que no exista el usuario

    try {
      const userExist = await User.findOne({email: obj.email}); //busco si el usuario ya existe en la base de datos
      if (userExist) { //si el usuario existe
        return false; //devuelvo false
      } else { //si el usuario no existe
        const hashPass = await bcrypt.hash(obj.password, 8) //encripto la contraseña
        obj.password = hashPass; //guardo la contraseña encriptada en el usuario
        const data = await super.save(obj); //guardo el usuario en la base de datos        
        return data; //devuelvo el usuario
      }      
    } catch (error) {
      console.log(error);
    }

  }

  async findByEmail (email) {
    try {
      const userExist = await User.findOne  ({email: email }); //busco si el usuario ya existe en la base de datos
      if (userExist) { 
        return userExist; 
      } else { 
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

}

export {UserContainer};
 

