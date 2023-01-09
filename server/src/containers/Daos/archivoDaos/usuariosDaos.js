import ArchivoContainer from "../../ArchivoContainer.js";
import bcrypt from "bcrypt";

const url = './src/dataBase/users.json'

class UserContainer extends ArchivoContainer {
  constructor() {
    super(url);
  }

  async save(obj) { //sobreescribo el metodo save de la clase padre para verificar que no exista el usuario

    try {
      /* verificar si existe un usuario con mismo mail */
      const users = await this.list();
      const userExist = users.find(user => user.email === obj.email); 
      if (userExist) { //si el usuario existe
        return false; //devuelvo false
      } else { //si el usuario no existe
        const hashPass = await bcrypt.hash(obj.password, 8) 
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
      const users = await this.list();
      const userExist = users.find(user => user.email === email); //busco si el usuario ya existe en la base de datos
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
 

