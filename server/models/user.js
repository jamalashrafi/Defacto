const mongoose = require('mongoose');
const bycrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    userName : { type : String, unique : true, required : true, lowercase : true },
    password : { type : String },
	email : { type : String, unique : true, required : true, lowercase : true },
	role : { type : String, unique : true, required : true, lowercase : true },
    date : Date
});

//On save hook, encrypt the password
//Before saving the password run this function

userSchema.pre('save', function(next){
	
	//get access to the user model
	const user = this;
	console.log('user value is --------', user);
	//generate the the salt then run the callback
	bycrypt.genSalt(10, (err,salt) => {
		if(err) return next(err);
		
		//hash(encrypt) our passowrd using the salt
		bycrypt.hash(user.password, salt, null, (err, hash) => {
			if(err) return next(err);
			
			//overwrite the plain text password with encrypted pwd
			console.log("text of hash is ", user.password);
			user.password = hash;
			console.log("text of hash is this ", user.password);
			next();
		});
	});
});

// {.method }    Adds an instance method to documents constructed from Models compiled from this schema. 
//If a hash of name/fn pairs is passed as the only argument, each name/fn pair will be added as methods.
userSchema.methods.comparePassword = function(candidatePassword, callback){
	console.log("------------------------------",this.password);
	console.log("------------------------------",this);
    bycrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){ return callback(err);}

        callback(null, isMatch);
    });
}



const userModelClass = mongoose.model('userSchema',userSchema);
module.exports = userModelClass;