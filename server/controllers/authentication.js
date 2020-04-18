const express = require('express')
const router = express.Router();
const jwtToken = require('jwt-simple');
const userModel = require('../models/user.js');
const config = require('../config.js');

function tokenForUser(userModel){
	const timestamp = new Date().getTime();
	return jwtToken.encode({sub : userModel.id, iat : timestamp }, config.secret);
}//userid + secret key = jwt

/*router.get('/', (req, res) => {
    res.send('Hi there');
});*/

exports.signin = function(req, res, next){
	console.log("user5", res['req']['authInfo']['message']);
    //User has already had their email and password auth'd
	//We just need to give them a token
	let userProfile={userName : req.user.userName, email : req.user.email, role : req.user.role };
    res.send({ token : tokenForUser(req.user), authInfo : res['req']['authInfo']['message'], userProfile });
}

exports.signup = function(req, res, next){
	
	const  userName = req.body.userName;
	const  password = req.body.password;
	const  email = req.body.email;
	const  role = req.body.role;
	const  date = req.body.date;
	var a=0;
	for(var i=0; i<1000000; i++){
		a=i;
	}
    const signUpData =  { 
		 userName : userName,
		 password : password,
		 email : email,
		 role : role,
		 date : "1584942597703"
     }
	
	 if(!userName || !password || !email)return res.status(422).send('You must fill the full details');
	 
	 userModel.findOne( { $or : [ { userName : userName }, {email : email } ] }, (err, existingUser) => {
		 if(err) return next(err);
		 console.log("Existing user from the db is",existingUser);
		 if(existingUser) {
			 if(signUpData.userName == existingUser.userName){ console.log('userNameValidate');
				return res.send('userNameValidate');
			 }else if(signUpData.email == existingUser.email){
				return res.send('emailValidate');
			 }
		 }
		 
		 
 
    const usermodel = new userModel(signUpData);
	usermodel.save((err)=>{
		console.log("Error in db",err)
            if(err){ return "error from query" + err;}
		//Respond the request with the email created signal
		console.log("Entered in db");	
        res.json({ token : tokenForUser(usermodel), Msg : "success"});
        });
    /*usermodel.save().then(() => res.json({
		token : tokenForUser(usermodel)})
        .catch(err => res.status(400).json('Error '+ err)));*/
	});

};

//module.exports = router;
//We will send the jwt token in response to sign up and token is produced using jwt-simple so the flow is like 
// userId + secretkey = JWT
//JWT + secretkey(decryption) = userID.

exports.getUsers = function(req, res){
	userModel.find({}, (err,results) => {
        if(err) return res.send(err);   
        res.send(results);
    });
}