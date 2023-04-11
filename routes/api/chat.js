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



router.get('/view-msgs', auth.required, auth.user, async (req, res) => {
    try {
      const allMsgs = await Chat.find({});
      const userMsgs = allMsgs
        .map((msg) => {
         
          if (msg.by.toString()===req.user._id.toString()) {
            return msg;
          }
        })
        .filter(Boolean);
    
      res.status(200).json({
        message: "Orders retrieved successfully",
        msgs: userMsgs
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });


router.get('/view-msg/:id',auth.required,auth.user,async(req,res,next)=>{

    const userid = req.params.id;
    try {
        const allMsgs = await Chat.find({});
        const userMsgs = allMsgs
          .map((msg) => {
           
            if (msg.to.toString()===userid.toString()) {
                console.log("condition true")
              return msg;
            }
          })
          .filter(Boolean);
      
        res.status(200).json({
          message: "Orders retrieved successfully",
          msgs: userMsgs
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error"
        });
      }

}
)
  


  







    


module.exports = router