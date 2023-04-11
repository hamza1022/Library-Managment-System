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

router.get("/get-msgs", auth.required, auth.user, async (req, res, next) => {
    try {
      const user = req.user._id;
  
      const userMsgs = await Chat.find({ $or: [{ by: user }, { to: user }] })
        .populate("by", "name -_id") // populate the `by` field with `name`
        .populate("to", "name -_id") // populate the `to` field with `name`
        .exec();
  
      res.status(200).json({
        message: "Chat retrieved successfully",
        msgs: userMsgs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });
  







    


module.exports = router