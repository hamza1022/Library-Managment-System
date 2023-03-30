let router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../../models/User')
let auth = require("../auth");

var emailService = require("../../utilities/emailService");
const upload = require("../../utilities/multer");




let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Users Api's are working`,
        })
    );
});

// router.param("email", (req, res, next, email) => {
// 	User.findOne({ email }, (err, user) => {
// 		if (!err && user !== null) {
// 			// console.log(user);
// 			req.userToUpdate = user;
// 			return next();
// 		}
// 		return next(new BadRequestResponse("User not found!", 423));
// 	});
// });


router.get('/getOne/:userId', (req, res, next) => {

    console.log(req.params.userId)

    User.findById(req.params.userId)
        .then((user) => {

            return next(new OkResponse(user));

        })
        .catch((err) => {
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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    let newUser = User();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.phoneNumber = req.body.phoneNumber;

    newUser.password = hashedPassword;
    newUser.address = req.body.address
    newUser.role = "user"
    newUser.setOTP();

    newUser.save()
        .then(result => {
            emailService.sendEmailVerificationOTP(result);
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
            return next(new BadRequestResponse("email dont exist"));
        }
        else if (user.status !== "active")
            return next(new UnauthorizedResponse("Your Account is Blocked!, Contact to Support please", 403));
        let match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return next(new BadRequestResponse("Incorrect Credentials"));
        }

        return next(new OkResponse(user.toAuthJSON()));
    } catch (error) {
        return next(new BadRequestResponse(error.message));
    }
});


router.get("/getUsers", auth.required, auth.admin, (req, res, next) => {
    User.find().then((user) => {
        return next(new OkResponse(user));

    }).catch((err) => {
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


router.put("/update-profile", auth.required, auth.user, (req, res, next) => {
    if (!req.body) return next(new BadRequestResponse("Missing required parameter.", 422.0));

    req.user.name = req.body.name || req.user.name;
    req.user.address = req.body.address || req.user.address;
    req.user.email = req.body.email || req.user.email;
    req.user.phoneNumber = req.body.phoneNumber || req.user.phoneNumber;

    req.user.save()
        .then((user) => {
            return next(new OkResponse(user));

        })
        .catch((err) => {
            if (err) return next(new BadRequestResponse(err));
        });
});


router.put("/update-password", auth.required, auth.user, async (req, res, next) => {
    if (!req.body.oldPassword || !req.body.password)
        return next(new BadRequestResponse("Missing Required Parameters"));

    if (req.body.oldPassword.length <= 0 || req.body.password.length <= 0)
        return next(new BadRequestResponse("Missing Required Parameters"));

    if (req.body.oldPassword === req.body.password)
        return next(new BadRequestResponse("Old password and new password cannot be same", 422));

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new BadRequestResponse(error.message));

        }


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


router.post("/verifyOtp/:type", async (req, res, next) => {

    console.log("req params", req.params.type)


    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new BadRequestResponse("Missing Required parameters"));
    }

    let query = {
        email: email,
    }

    const user = await User.findOne(query);
    if (!user) {
        return next(new BadRequestResponse("User not found"));
    }

    if (user.otp !== otp) {
        return next(new BadRequestResponse("Invalid OTP"));
    }

    user.otp = null;
    user.status = "active"
    user.otpExpires = null;

    if (+req.params.type === 1) {
        user.isOtpVerified === true
    } else {
        user.generatePasswordRestToken();
    }


    await user.save()
        .then((user) => {
            if (+req.params.type === 1) {
                return next(new OkResponse(user.toAuthJSON()));
            } else if (+req.params.type === 2) {
                return next(new OkResponse({ passwordRestToken: user.resetPasswordToken, user }));
            }
        })


});


router.post("/reset-password/:email", async (req, res, next) => {
    let email = req.params.email;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return next(new BadRequestResponse("User not found"));
        }

        if (!req.body.resetPasswordToken || !req.body.password) {
            return next(new UnauthorizedResponse("Missing Required Parameters"));
        }
        if (req.body.resetPasswordToken !== user.resetPasswordToken) {
            return next({ err: new UnauthorizedResponse("Invalid Password Reset Token") });
        }




        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword;
        await user.save()
        .then((result) => {

            return next(new OkResponse({ message: "Password has been changed successfully" }));
        })
        .catch((err)=>{
            return next(new BadRequestResponse(err.message));

        })

    }
    catch (error) {
        return next(new BadRequestResponse(error.message));


       
    }

});

router.patch('/profileImage', auth.required, auth.user, upload.array('files', 5), (req, res, next) => {

    const file = req.file;
    const dataToUpdate = { profileImage: file.filename };



    User.findByIdAndUpdate(req.user.id, dataToUpdate)
        .then((result) => {
            const imageUrl = `http://localhost:8080/images/${file.filename}`;
            return next(new OkResponse({ ...result, imageUrl }));
        })
        .catch((err) => {
            return next(new BadRequestResponse(err));
        })

})

router.put("/update-status/:email", auth.required, auth.admin, async (req, res, next) => {


    let email = req.params.email;
    let user = await User.findOne({ email: email });

    if (!user) {
        return next(new BadRequestResponse("User not found"));
    }
    console.log("request", req.body.status)
    user.status = req.body.status;

    user.save()
        .then((data) => {
            return next(new OkResponse(data));
        })
        .catch((err) => {
            return next(new BadRequestResponse(err.message));

        })


});

router.get("/context", auth.required, auth.user, (req, res, next) => {
    return next(new OkResponse(req.user.toAuthJSON()));
});

router.post("/forgot/email", async (req, res, next) => {
    if (!req.body.email) {
        return next(new BadRequestResponse("Missing required parameter.", 422.0));
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new BadRequestResponse("User does not exist.", 422.0));

    }
    user.setOTP();
    user.isOtpVerified = true

    user.save()
        .then((result) => {
            emailService.sendEmailVerificationOTP(result);
            return next(new OkResponse({ result, message: "Otp sent SUCCESSFUL to this Email" }));


        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });





});

router.post("/otp/resend/:email", async (req, res, next) => {

    let email = req.params.email;
    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return next(new BadRequestResponse("User not found"));
        }

        user.setOTP();

     
        
        user.save()
        .then(result => {
            emailService.sendEmailVerificationOTP(result);
            return next(new OkResponse(result));
        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });
       

    }
    catch(err){
        return next(new BadRequestResponse(err));

    }



	
   


});









module.exports = router