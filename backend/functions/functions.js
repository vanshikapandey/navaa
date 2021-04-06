const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.hashPassword = async (password) => {
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }catch{
    res.status(500).send('not working');
  }
}

exports.isAuthorised = (req, res, next) => {

  const token = req.cookies.user;


  if(token == null) return res.sendStatus(401);

  jwt.verify(token , process.env.SECRET, (err, details) =>{
    if(err) return res.sendStatus(403);
    console.log(details);
    req.email = details.email;
    next();
  })
}

exports.validateInfo = (req, res, next)=> {
  body('email').isEmail();
  body('password').isLength({ min: 5 });
  body('name').isLength({ min: 2 });
  body('address').isLength({ min: 2 });
  body('phone').isLength({ min: 10 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }else{
  next();
}

}

exports.validateCredentials = (req, res, next)=> {
  body('email').isEmail();
  body('password').isLength({ min: 5 });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }else{
  next();
}

}
