let router = require("express").Router();
const Order = require('../../models/Order')
const Book = require('../../models/Book')
let auth = require("../auth");
const moment = require('moment');


let { OkResponse, BadRequestResponse, UnauthorizedResponse } = require("express-http-response");



router.get("/", function (req, res, next) {
    return next(
        new OkResponse({
            message: `Orders Api's are working`,
        })
    );
});


  
router.post("/create", auth.required, auth.user, async (req, res, next) => {
    if (!req.body.books || !req.body.customer) {
      return next(new BadRequestResponse("Missing Required parameters"));
    }
  
    if (req.user.role !== "user") {
      return next(new UnauthorizedResponse("Not Allowed!"));
    }
  
    const pricePerDay = 50; 
  
    const fine = pricePerDay   ; 
  
    const newOrder = new Order({
      books: req.body.books,
      customer: req.body.customer,
      fine: fine ,
      
    });
  
       newOrder.save()
      .then(async (order) => {

       
      const bookIds = order.books.map((book) => book._id);
      await Book.updateMany({ _id: { $in: bookIds } }, { status: "lent" });
        return Order.populate(order, { path: "books",select:"-_id bookName bookTitle status" });
      })
      .then((order) => {
        return Order.populate(order, { path: "customer", select:"-_id name address phoneNumber" });
      }) .then((order) => {
        return Order.populate(order, { path: "books.Author", model: "Author",select:"-_id name" });
      })
      .then((order) => {
        return next(new OkResponse(order));
      })
      .catch((err) => {
        return next(new BadRequestResponse(err));
      });
  });


//   router.put('/return',auth.required,auth.user,(req,res,next)=>{
//     const {orderId , currentDate} = req.body
//     const order = Order.find({_id:orderId})
//     if(!order){
//         return next(new BadRequestResponse);
//     }

//     const borrowDate = new Date(order.createdAt);
//   const overdueDays = Math.max(0, Math.floor((new Date(currentDate) - borrowDate) / (1000 * 60 * 60 * 24)) - 7);

//   const fineRate = 50
//   const fine = overdueDays * fineRate;

//   Order.save().then(()=>{

//   }).catch((err)=>{

//   })


//   })


// router.put('/return', auth.required, auth.user, async (req, res, next) => {
//   const { orderId, currentDate } = req.body;

//   try {
//     const order = await Order.findOne({ _id: orderId });

//     if (!order) {
//       return next(new BadRequestResponse('Order not found'));
//     }

//     const borrowDate = moment(order.createdAt);
//     const currentDateObj = moment(currentDate);
//     const overdueDays = Math.max(0, currentDateObj.diff(borrowDate, 'days') - 7);
//     const fineRate = 50;
//     const fine = overdueDays * fineRate;

//     order.fine = fine;
//     order.status = 'returned';

//     await order.save();

//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// });

 

router.get("/getOrders", auth.required, auth.admin,  (req, res, next) => {
    Order.find()
    .then((order) => {
      return Order.populate(order, { path: "books",select:"-_id bookName bookTitle" });
    })
    .then((order) => {
      return Order.populate(order, { path: "customer", select:"-_id name address phoneNumber" });
    }) .then((order) => {
      return Order.populate(order, { path: "books.Author", model: "Author",select:"-_id name" });
    })
    .then((order) => {
      return next(new OkResponse(order));
    })
    .catch((err) => {
      return next(new BadRequestResponse(err));
    });
});


router.delete("/delete/:bookId", auth.required, auth.admin,  (req, res, next) => {
    if (req.user.role !== "admin" )
    {
    return next(new UnauthorizedResponse("Not Allowed!"));
}
     Order.deleteOne({_id:req.params.bookId})
    .then((deletedOrder) => {
        
        return next(new OkResponse(deletedOrder));

    })
    .catch((err) => {
        return next(new BadRequestResponse({ error: "The Order you want to deleted is not registered in our database" }));
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
          Order.findById(bookId)
          .then((book) =>{
            if(!book){
                return next(new BadRequestResponse("The Order Doesnot Exists."));

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