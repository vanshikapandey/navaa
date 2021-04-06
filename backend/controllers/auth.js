
const User = require("../models/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {hashPassword } = require("../functions/functions");

exports.logout = (req, res)=>{
  res.send('user signed out!');
};


exports.signup = async (req,res) => {
  try{
     req.body.password = await hashPassword(req.body.password);
  const user = new User(req.body);
  user.save((err, user)=>{
    if(err){
      res.status(400).json(err);
    }

    res.json(user);
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

        res.status(200).json({token: token});


        // Send JWT
      } else {
        // response is OutgoingMessage object that server response http request
         res.json({success: false, message: 'passwords do not match'});
      }


}catch(error){
    console.log(error);
    res.send('err');
}
});
};
