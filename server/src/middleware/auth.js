const auth = (req, res, next) => {
  
  if (req.isAuthenticated()) { //req.isAuthenticated() es una funcion de passport, que devuelve true si el usuario esta autenticado, y false si no lo esta
    next();
  } else {    
    res.status(401).send({message: 'No estas logueado'});
    //res.render("login");
  }
};

export default auth;