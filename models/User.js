let mongoose = require("mongoose");
var bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken");
let crypto = require("crypto");


let userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true, required: true },
		name: { type: String },
		address: { type: String },
		phoneNumber: { type: String, default: "" },
        password:{type:String},
        role: {
			type: String,
			default: "user",
			enum: ["user", "admin"],
		},

	
	},
	{ timestamps: true }
);



userSchema.pre('save', function (next) {

    var salt = bcrypt.genSaltSync(10);
    if (this.password && this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, salt);

    }
    next();
})

userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{
			id: this._id,
			email: this.email,
		},
		secret,
		{ expiresIn: "60d" }
	);
};



userSchema.methods.toAuthJSON = function () {
	return {
		email: this.email,
		name: this.name,
		role: this.role,
		address: this.address,
        phoneNumber:this.phoneNumber,
        password:this.password,
        role:this.role,
		

		token: this.generateJWT(),
	};
};
let users = mongoose.model("User", userSchema)

module.exports = users