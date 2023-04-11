"use strict";
module.exports = {

	PORT: 8000,
	MONGODB_URI: "mongodb://localhost:27017/LMS",
    secret: "secret",
	smtpAuth: {
		user: "admin@deomgevingsverbinder.nl",
		pass: "Olifant1234!",
	},
	publicPics: "https://fixerstation.sfo3.digitaloceanspaces.com/publicPics",
	allowedOrigins: ["http://localhost:3000", "http://localhost:5000", "http://localhost:8080", "http://137.184.119.32", "http://164.92.88.88", "http://165.232.140.59"],
    


};
