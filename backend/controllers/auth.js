
const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {hashPassword } = require("../functions/functions");

exports.logout = (req, res)=>{
  res.clearCookie('user');
  res.sendStatus(200);
};


exports.signup = async (req,res) => {
  try{
     req.body.password = await hashPassword(req.body.password);
  const user = new User(req.body);
  user.save((err, user)=>{
    if(err){
      res.status(400).json(err);
    }
    res.sendStatus(200);
  });
}catch{
  res.send('not able to register user');
}

};

exports.login =   (req, res) => {
   User.find({email: req.body.email} , async (err, user)=>{
    if(err){
      res.send('invalid email');
    }

    try{

      const result = await bcrypt.compare(req.body.password, user[0].password);

       if (result){
         var token = jwt.sign({ email: req.body.email }, process.env.SECRET);

         res.cookie('user', token);
         res.sendStatus(200);
        //res.status(200).json({token: token});



      } else {

         res.json({success: false, message: 'passwords do not match'});
      }


}catch(error){
    console.log(error);
    res.send('err');
}
});
};
