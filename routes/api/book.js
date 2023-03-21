let router = require("express").Router();
const Book = require('../../models/Book')
let auth = require("../auth");



let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Books Api's are working`,
        })
    );
});


router.post("/create", auth.required,auth.admin,  async (req, res, next) => {
    if ( !req.body.bookName) {
        return next(new BadRequestResponse("Missing Required parameters"));
    }

    if (req.user.role !== "admin" )
    {
    return next(new UnauthorizedResponse("Not Allowed!"));
}
   
    // Create author in our database
    let newBook = Book();
    newBook.bookName = req.body.bookName;
    newBook.bookTitle = req.body.bookTitle;
    newBook.bookPrice = req.body.bookPrice;
    newBook.Author = req.body.Author

    // console.log(newBook);
    newBook.save()
        .then(result => {
            return next(new OkResponse(result));
        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });

});

router.get('/getOne/:bookId',(req,res,next)=>{
    
    Book.findById(req.params.bookId)
    .then((book)=>{
        return next(new OkResponse(book));
    })
    .catch((err)=>{
        return next(new BadRequestResponse(err));
    })

})

router.get("/getBooks",   (req, res, next) => {
    Book.find().
    populate('Author', 'name country').then((book)=>{
        return next(new OkResponse(book));

    }).catch((err)=>{
        console.log(err)
    })
});


router.delete("/delete/:bookId", auth.required, auth.admin,  (req, res, next) => {
    if (req.user.role !== "admin" )
    {
    return next(new UnauthorizedResponse("Not Allowed!"));
}
     Book.deleteOne({_id:req.params.bookId})
    .then((deletedBook) => {
        
        return next(new OkResponse(deletedBook));

    })
    .catch((err) => {
        return next(new BadRequestResponse({ error: "The Book you want to deleted is not registered in our database" }));
    })
});


router.put("/update/:bookId", auth.required, auth.admin, (req, res, next) => {
    if (req.user.role !== "admin" )
    {
    return next(new UnauthorizedResponse("Not Allowed!"));
}
    try {
   
        const { bookId } = req.params
        const dataToUpdate = req.body
          Book.findById(bookId)
          .then((book) =>{
            if(!book){
                return next(new BadRequestResponse("The Book Doesnot Exists."));

            }
            for (let key in dataToUpdate) {
                book[key] = dataToUpdate[key]
              }
              book.save()
              return next(new OkResponse(book));
          }).catch((err)=>{
            console.log(err)
          })
        }catch (error) {
            res.status(500).json({ error: 'INTERNAL SERVER ERROR' })
          }
      
 })


module.exports = router