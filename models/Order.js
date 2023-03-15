// const mongoose = require('mongoose');

// const orderSchema = mongoose.Schema(
//    {
        

//         books: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Book'
//           }], 
//           customer:{
//             ref: 'User',
//             type: mongoose.Schema.Types.ObjectId
//           },

//     },
//     {timestamps:true},
//     {
//         toJSON: { virtuals: true },
//         toObject: { virtuals: true },
//       }
//     );


//  orderSchema.virtual('totalAmount')
//   .get(function() {
//     const pricePerDay = 50; // price per day for each book
//     const numDays = this.books.length; // number of days for the rental
//     return pricePerDay * numDays; // total price for the order
//   });


//   orderSchema.methods.toJSON = function () {
//     return {
//       books: this.books,
//       customer: this.customer,
     
//     };
//   };

// module.exports = mongoose.model("Order", orderSchema);



const orderSchema = mongoose.Schema(
  {
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }], 
    customer: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId
    },
    totalAmount: {
      type: Number,
      default: 0
    },
   
  },
  {timestamps: true}
);


  orderSchema.methods.toJSON = function () {
    return {
      books: this.books,
      customer: this.customer,
      totalAmount:this.totalAmount,
    
     
    };
  };
module.exports = mongoose.model("Order", orderSchema);

