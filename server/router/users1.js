const express = require('express')
const router = express.Router();
const jwtToken = require('jwt-simple');
const userModel = require('../models/user.js');
const config = require('../config.js');

function tokenForUser(userModel){
	const timestamp = new Date().getTime();
	return jwtToken.encode({sub : userModel.id, iat : timestamp }, config.secret);
}//userid + secret key = jwt

router.get('/', (req, res) => {
    res.send('Hi there');
});

router.post('/signup', (req, res) => {
	const  userName = req.body.userName;
	const  password = req.body.password;
	const  email = req.body.email;
	const  date = req.body.date;
	
const signUpData =  { 
	 userName : userName,
     password : password,
     email : email,
     date : date
     }
	 
	 if(!userName || !password || !email)return res.status(422).send('You must fill the full details');
	 
	 userModel.findOne( { userName : userName }, (err, existingUser) => {
		 if(err) return next(err);
		 
		 if(existingUser) return res.status(422).send('User already exists');
		 
		 
 
    const usermodel = new userModel(signUpData);
	usermodel.save((err)=>{
            if(err){ return next(err);}
        //Respond the request with the email created signal
            res.json({ token : tokenForUser(usermodel)});
        });
    /*usermodel.save().then(() => res.json({
		token : tokenForUser(usermodel)})
        .catch(err => res.status(400).json('Error '+ err)));*/
	});

});

module.exports = router;
//We will send the jwt token in response to sign up and token is produced using jwt-simple so the flow is like 
// userId + secretkey = JWT
//JWT + secretkey(decryption) = userID.