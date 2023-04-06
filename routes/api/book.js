let router = require("express").Router();
let auth = require("../auth");
const Book = require ("../../models/Book")



let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Books Api's are working`,
        })
    );
});


router.post("/create", auth.required,auth.admin,  async (req, res, next) => {
    if ( !req.body.name) {
        return next(new BadRequestResponse("Missing Required parameters"));
    }

    if (req.user.role !== "admin" )
    {
    return next(new UnauthorizedResponse("Not Allowed!"));
}
   
    // Create author in our database
    let newBook = Book();
    newBook.name = req.body.name;
    newBook.title = req.body.title;
    newBook.price = req.body.price;
    newBook.Author = req.body.Author
    newBook.status = "Available";

    // console.log(newBook);
    newBook.save()
        .then (async(book) => {
          await book.populate([{path: 'Author', select: 'name'}])
            return next(new OkResponse(book));
        })
        .catch(err => {
            return next(new BadRequestResponse(err));
        });

});

router.get('/getOne/:bookId',(req,res,next)=>{
    
    Book.findById(req.params.bookId)
    .then(async(book)=>{
      await book.populate('Author', 'name country')
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
                return next(new BadRequestResponse("The Book Does not Exists."));

            }
            for (let key in dataToUpdate) {
                if (Object.prototype.hasOwnProperty.call(dataToUpdate, key)) {
                  if (dataToUpdate[key]) {
                    book[key] = dataToUpdate[key];
                  }
                }
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

 router.get("/search", async (req, res, next) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return next(new BadRequestResponse("Missing search query parameter"));
    }
  
    try {
      const books = await Book.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { title: { $regex: searchQuery, $options: "i" } },
         
        ],
      })
        .populate("Author", "name -_id")
        .select("-__v")
        .exec();
      return next(new OkResponse(books));
    } catch (err) {
      return next(new BadRequestResponse(err));
    }
  });


module.exports = router