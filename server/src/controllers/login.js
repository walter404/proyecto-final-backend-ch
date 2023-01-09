//import logger
import { sendInfoLog } from '../logs/logger.js';

const postLogin = (req, res) => {
  sendInfoLog(req);
  console.log(req.user);
  res.status(200).send({message: 'Login exitoso'}); //no hay try catch porque passport ya lo hace  
}

export { postLogin };