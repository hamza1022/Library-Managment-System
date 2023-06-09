require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = require("./config").MONGODB_URI

let con = mongoose
	.connect(`${MONGODB_URI}?retryWrites=false`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
		// useCreateIndex: true,
	})
	.catch((err) => {
		console.log(err);
		process.exit(1);
	})
	.then(() => {
		console.log("connected to db in development environment");
		init();
	});

const defaultUser = require("./seeder/user");
const defaultAuthor = require('./seeder/authors')

async function init() {
	console.log("dropping DB");
	await mongoose.connection.db.dropDatabase();

	await defaultUser();
	await defaultAuthor();

	exit();
}

function exit() {
	console.log("exiting");
	process.exit(1);
}
