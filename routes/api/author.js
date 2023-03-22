let router = require("express").Router();
const Author = require('../../models/Author')
let auth = require("../auth");



let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Authors Api's are working`,
        })
    );
});

router.get('/getOne/:authorId',(req,res,next)=>{
    
    Author.findById(req.params.authorId)
    .then((author)=>{
        return next(new OkResponse(author));
    })
    .catch((err)=>{
        return next(new BadRequestResponse(err));
    })

})

router.post("/create", async (req, res, next) => {
    if ( !req.body.name) {
        return next(new BadRequestResponse("Missing Required parameters"));
    } else if (
        req.body.name.length === 0
       
    ) {
        return next(new BadRequestResponse("Missing Required parameters"));
    }

   

    // Create author in our database
    let newAuthor = Author();
    newAuthor.name = req.body.name;
    newAuthor.age = req.body.age;
    newAuthor.country = req.body.country;

    // console.log(newAuthor);
    newAuthor.save()
        .then(result => {
            return next(new OkResponse(result));
        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });

});


router.get("/getAuthors", auth.required, (req, res, next) => {
    Author.find().then((author)=>{
        return next(new OkResponse(author));

    }).catch((err)=>{
        console.log(err)
    })
});


router.delete("/delete/:authorId", auth.required, auth.admin,  (req, res, next) => {

   
     Author.deleteOne({_id:req.params.authorId})

  
   
    .then((deletedAuthor) => {
        
        return next(new OkResponse(deletedAuthor));

    })
    .catch((err) => {
        return next(new BadRequestResponse({ error: "The Email you want to deleted is not registered in our database" }));
    })
});


router.put("/update/:authorId", auth.required, auth.admin, (req, res, next) => {
    try {
   
        const { authorId } = req.params
        const dataToUpdate = req.body
          Author.findById(authorId)
          .then((author) =>{
            if(!author){
                return next(new BadRequestResponse("The Author Doesnot Exists."));

            }
            for (let key in dataToUpdate) {
                if (Object.prototype.hasOwnProperty.call(dataToUpdate, key)) {
                  if (dataToUpdate[key]) {
                    author[key] = dataToUpdate[key];
                  }
                }
              }
              author.save()
              return next(new OkResponse(author));
          }).catch((err)=>{
            console.log(err)
          })
        }catch (error) {
            res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
          }
      
 })
    


module.exports = router