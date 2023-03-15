const Author = require("../models/Author");

async function seedAuthor() {
	// Seed Admin
	{
		let newAuthor = new Author();
		newAuthor.name = "Adam";
		newAuthor.age = 30;
		newAuthor.country = "Pakistan  ";
    

		await newAuthor.save();
	}
    {
		let newAuthor = new Author();
		newAuthor.name = "john";
		newAuthor.age = 40;
		newAuthor.country = "India";
    

		await newAuthor.save();
	}
    {
		let newAuthor = new Author();
		newAuthor.name = "Shista";
		newAuthor.age = 30;
		newAuthor.country = "Uk";
    

		await newAuthor.save();
	}
	// Seed user
	

	console.log("Default Authors Seeded");
}

module.exports = seedAuthor;