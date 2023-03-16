let router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../../models/User')
let auth = require("../auth");



let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Users Api's are working`,
        })
    );
});


router.get('/getOne/:userId',(req,res,next)=>{

    console.log(req.params.userId)

    User.findById(req.params.userId)
    .then((user)=>{

        return next(new OkResponse(user));

    })
    .catch((err)=>{
        return next(new BadRequestResponse(err));
    })

})


router.post("/signUp", async (req, res, next) => {
    if (!req.body.email || !req.body.name || !req.body.password) {
        return next(new BadRequestResponse("Missing Required parameters"));
    } else if (
        req.body.email.length === 0 ||
        req.body.name.length === 0 ||
        req.body.password.length === 0
    ) {
        return next(new BadRequestResponse("Missing Required parameters"));
    }

    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
        return next(new BadRequestResponse("Email Already exist"));
    }

    // Create user in our database
    let newUser = User();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.phoneNumber = req.body.phoneNumber;

    newUser.password = req.body.password;
    newUser.address = req.body.address
    newUser.role = req.body.role



    // console.log(newUser);
    newUser.save()
        .then(result => {
            return next(new OkResponse(result));
        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });

});

// router.post('/login', async (req, res, next) => {

//     if (!req.body.email || !req.body.password) {

//         res.status(301).json({ message: "error", messgae: "Please enter Email and password" })
//     }

//     let user = await User.findOne({ email: req.body.email })

//     if (!user || user.password === req.body.password) {
//         return next(new BadRequestResponse("Incorrect Credentials"));

//     }
//     else if (user) {
//         let match = await bcrypt.compare(req.body.password, user.password)
//         if(match){

//             return next(new OkResponse(user.toAuthJSON()));
//         }
//         return next(new BadRequestResponse("Incorrect Credentials"));

//     }
   

// })
router.post('/login', async (req, res, next) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "error", messgae: "Please enter Email and password" });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new BadRequestResponse("Incorrect Credentials"));
        }

        console.log("user pass",user.password)


        let match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return next(new BadRequestResponse("Incorrect Credentials"));
        }

        return next(new OkResponse(user.toAuthJSON()));
    } catch (error) {
        return next(new BadRequestResponse(error.message));
    }
});


router.get("/getUsers", auth.required, auth.user, (req, res, next) => {
    User.find().then((user)=>{
        return next(new OkResponse(user));

    }).catch((err)=>{
        console.log(err)
    })
});


router.delete("/delete/:email", auth.required, auth.admin, (req, res, next) => {

    User.deleteOne({ email: req.params.email })
        .then((deletesUser) => {
            console.log(deletesUser)

            return next(new OkResponse("User deleted"));


        })
        .catch((err) => {
            return next(new BadRequestResponse({ error: "The Email you want to deleted is not registered in our database" }));
        })
});

router.put("/update/:userId", auth.required, auth.admin, (req, res, next) => {

    try {
   
        const { userId } = req.params
        const dataToUpdate = req.body
          User.findById(userId)
          .then((user) =>{
            if(!user){
                return next(new BadRequestResponse("The User Doesnot Exists."));

            }
            for (let key in dataToUpdate) {
                user[key] = dataToUpdate[key]
              }
              user.save()
              return next(new OkResponse(user));
          }).catch((err)=>{
            console.log(err)
          })
        }catch (error) {
            res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
          }
      
 })


router.put("/update-password", auth.required, auth.user, async (req, res, next) => {
	if (!req.body.oldPassword || !req.body.password)
		return next(new BadRequestResponse("Missing Required Parameters"));

	if (req.body.oldPassword.length <= 0 || req.body.password.length <= 0)
		return next(new BadRequestResponse("Missing Required Parameters"));

	if (req.body.oldPassword === req.body.password)
		return next(new BadRequestResponse("Old password and new password cannot be same", 422));

	try {
		const user = await User.findById(req.user.id);

      
		const hashedPassword = user.password;
		const passwordMatch = await bcrypt.compare(req.body.oldPassword, hashedPassword);
		
		if (passwordMatch) {
			const salt = await bcrypt.genSalt(10);
			const hashedNewPassword = await bcrypt.hash(req.body.password, salt);

			user.password = hashedNewPassword;
			await user.save();

			return next(new OkResponse({ message: "Password has been changed successfully" }));
		} else {
			return next(new BadRequestResponse("Invalid Old Password!!", 422));
		}
	} catch (error) {
		return next(new BadRequestResponse(error.message));
	}
});



module.exports = router