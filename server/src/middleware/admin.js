const admin = (req, res, next) => {
  if (req.user.username === 'walter') {
    next();
  } else {
    res.status(401).send({ message: 'No estas autorizado' });
  }
}

export default admin;