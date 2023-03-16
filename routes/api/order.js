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

router.get('/getOne/:orderId',(req,res,next)=>{

  Order.findById(req.params.orderId)
  .then((order)=>{

      return next(new OkResponse(order));

  })
  .catch((err)=>{
      return next(new BadRequestResponse(err));
  })

})

router.post("/create", auth.required, auth.user, async (req, res, next) => {

  if (!req.body.books || !req.body.customer) {
    return next(new BadRequestResponse("Missing Required parameters"));
  }
  if (req.user.role !== "user") {
    return next(new UnauthorizedResponse("Not Allowed!"));
  }
  const orderStatus = "Not Returned"
  const newOrder = new Order({
    books: req.body.books,
    customer: req.body.customer,
    fineafterperDay: 50,
    status:orderStatus

  });
  newOrder.save()
    .then(async (order) => {
      const bookIds = order.books.map((book) => book._id);
      await Book.updateMany({ _id: { $in: bookIds } }, { status: "lent" });
      return Order.populate(order, { path: "books", select: "-_id bookName bookTitle status" });
    })
    .then((order) => {
      return Order.populate(order, { path: "customer", select: "-_id name address phoneNumber email" });
    })
    .then((order) => {
      return Order.populate(order, { path: "books.Author", model: "Author", select: "-_id name" });
    })
    .then((order) => {
      const responseObj = {
        message: "Order Created Successfully",
        order: {
          books: order.books,
          customer: order.customer,
          fineafterperDay: order.fineafterperDay,
          status:order.status
        },
      };
      res.status(201).json(responseObj);
      // const { fineafterperDay, ...rest } = order.toObject();
      // return next(new OkResponse({ ...rest, fineafterperDay }));
    })
    .catch((err) => {
      return next(new BadRequestResponse(err));
    });
});

router.put('/return', auth.required, auth.user, async (req, res, next) => {
  const { orderId } = req.body;
  const currentDate = new Date();
  
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    return next(new BadRequestResponse('Order not found'));
  }

  const borrowDate = moment(order.createdAt);
  const currentDateObj = moment(currentDate);
  const overdueDays = Math.max(0, currentDateObj.diff(borrowDate, 'days') - 7);
  const fineRate = 50;
  const fine = overdueDays * fineRate;
 

  order.fineafterperDay = fine;
  order.status = "Returned"
  order.save()
    .then(async (order) => {
      const bookIds = order.books.map((book) => book._id);
      await Book.updateMany({ _id: { $in: bookIds } }, { status: "Available" });

      return Order.populate(order, { path: "books", select: "-_id bookName bookTitle status" });
    })
    .then((order) => {
      return Order.populate(order, { path: "customer", select: "-_id name address phoneNumber" });
    }).then((order) => {
      return Order.populate(order, { path: "books.Author", model: "Author", select: "-_id name" });
    })
    .then((order) => {
      res.status(201).json({
        message:"Successfully Returned",
        data:order
      })
      return next(new OkResponse(order));
    })
    .catch((err) => {
      return next(new BadRequestResponse(err));
    });


});

router.get('/view', auth.required, auth.user, async (req, res) => {
  try {
    const allOrders = await Order.find({});
    const userOrders = allOrders
      .map((order) => {
        if (order.customer.equals(req.user._id)) {
          return order;
        }
      })
      .filter(Boolean); // filter out undefined values
  
    res.status(200).json({
      message: "Orders retrieved successfully",
      orders: userOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.get("/getOrders", auth.required, auth.admin, (req, res, next) => {
  Order.find()
    .then((order) => {
      return Order.populate(order, { path: "books", select: "-_id bookName bookTitle status" });
    })
    .then((order) => {
      return Order.populate(order, { path: "customer", select: "-_id name address phoneNumber email" });
    }).then((order) => {
      return Order.populate(order, { path: "books.Author", model: "Author", select: "-_id name" });
    })
    .then((order) => {
      return next(new OkResponse(order));
    })
    .catch((err) => {
      return next(new BadRequestResponse(err));
    });
});

router.delete("/delete/:orderId", auth.required, auth.admin, (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new UnauthorizedResponse("Not Allowed!"));
  }
  Order.deleteOne({ _id: req.params.orderId })
    .then((deletedOrder) => {

      return next(new OkResponse(deletedOrder));

    })
    .catch((err) => {
      return next(new BadRequestResponse({ error: "The Order you want to deleted is not registered in our database" }));
    })
});

router.put("/update/:orderId", auth.required, auth.user, (req, res, next) => {
  if (req.user.role !== "user") {
    return next(new UnauthorizedResponse("Not Allowed!"));
  }
  try {

    const { orderId } = req.params
    const dataToUpdate = req.body
    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return next(new BadRequestResponse("The Order Doesnot Exists."));

        }
        for (let key in dataToUpdate) {
          order[key] = dataToUpdate[key]
        }
        order.save()
        return next(new OkResponse(order));
      }).catch((err) => {
     
      })
  } catch (error) {
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
        { bookName: { $regex: searchQuery, $options: "i" } },
        { bookTitle: { $regex: searchQuery, $options: "i" } },
       
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