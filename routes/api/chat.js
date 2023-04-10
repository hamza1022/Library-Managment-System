let router = require("express").Router();
const Chat = require('../../models/Chat')
let auth = require("../auth");



let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Chat  Api's are working`,
        })
    );
});


router.post("/create-msg",auth.required , auth.user ,  async (req, res, next) => {
    if ( !req.body.to) {
        return next(new BadRequestResponse("Missing Required parameters"));
    } else if ( req.body.msg === "" )
     {
        return next(new BadRequestResponse("Missing Required parameters"));
    }

   

    // Create msg in our database
    let newChat = Chat();
    newChat.msg = req.body.msg;
    newChat.by = req.user._id;
    newChat.to = req.body.to;

    // console.log(newChat);
    newChat.save()
        .then(result => {
            return next(new OkResponse(result));
        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });

});






    


module.exports = router