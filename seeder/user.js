const User = require("../models/User");

async function seedUser() {
	// Seed Admin
	{
		let newUser = new User();
		newUser.role = "admin";

		newUser.email = "admin@gmail.com";
		newUser.name = "admin";

		newUser.phoneNumber = "03006454135";
		newUser.address = "lahore johar town";
        newUser.password = "hamza12"

		await newUser.save();
	}
	// Seed user
	{
		let newUser = new User();

		newUser.email = "user@gmail.com";
		newUser.name = "user";

		newUser.phoneNumber= "1234567890";
		newUser.address = "lahore johar town b block";
        newUser.password = "hamza1233"

		await newUser.save();
	}

	console.log("Default Users Seeded");
}

module.exports = seedUser;