let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
	new LocalStrategy({ email: "email", password: "password"}, function (email, password, done) {
        console.log(email,password)
        console.log("dtewuyds")
		User.findOne({ email  })
			.then((user) => {
				if (!user) {
					return done(null, false, { errors: { "email or password": "is invalid" } });
				}
                else{
                    console.log("running else")
                }
				return done(null, user);
			})
			.catch(done);
	})
);
