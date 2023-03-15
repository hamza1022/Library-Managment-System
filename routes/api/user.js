let router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../../models/User')
let auth = require("../auth");



let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");


// General Check
router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Users Api's are working`,
        })
    );
});


// Signup
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

router.post('/login', async (req, res, next) => {

    if (!req.body.email || !req.body.password) {

        res.status(301).json({ message: "error", messgae: "Please enter Email and password" })
    }

    let user = await User.findOne({ email: req.body.email })

    if (!user || user.password === req.body.password) {
        return next(new BadRequestResponse("Incorrect Credentials"));

    }
    else if (user) {
        let match = await bcrypt.compare(req.body.password, user.password)

        return next(new OkResponse(user.toAuthJSON()));

        // if (match) {
        //     const payload = {
        //         _id: user._id,
        //         email: user.email,
        //         name: user.userName,

        //     }
        //     const token = JWT.sign(payload, secret, {
        //         expiresIn: '24h'
        //     })
        //     res.status(200).json({
        //         message: 'SUCCESS: logged in.',
        //         token,
        //         user: user
        //     })
        // } else {
        //     return next(new BadRequestResponse("password is invalid"));

        // }
    }

    res.status(500).json({ error: 'INTERNAL SERVER ERROR' })

})

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
    


module.exports = router