let mongoose = require("mongoose");
var bcrypt = require('bcrypt');
let jwt = require("jsonwebtoken");
let crypto = require("crypto");
const { publicPics } = require("../config");

let userSchema = new mongoose.Schema(
	{
		email: { type: String, unique: true, required: true },
		name: { type: String },
		address: { type: String },
		phoneNumber: { type: String, default: "" },
		otp: { type: String, default: null },
		otpExpires: { type: Date, default: null },
		isOtpVerified: { type: Boolean, default: false },
		profileImage:[ { type: String, default: `${publicPics}/noImage.png` }],
        password:{type:String},
		status:{type:String,},
		resetPasswordToken: { type: String, default: null },
        role: {
			type: String,
			default: "user",
			enum: ["user", "admin"],
		},
		status: { type: String, enum: ["active", "blocked", "pending"], default: "pending" },

	
	},
	{ timestamps: true }
);




userSchema.methods.setOTP = function () {
	this.otp = Math.floor(1000 + Math.random() * 9000);
	this.otpExpires = Date.now() + 3600000; // 1 hour
};

userSchema.methods.generatePasswordResetToken = function () {
	this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
};



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
		_id: this._id,
		email: this.email,
		name: this.name,
		role: this.role,
		address: this.address,
        phoneNumber:this.phoneNumber,
        password:this.password,
        role:this.role,
		profileImage:this.profileImage,
		status:this.status,
		isOtpVerified:this.isOtpVerified,
		

		token: this.generateJWT(),
	};
};
let users = mongoose.model("User", userSchema)

module.exports = users