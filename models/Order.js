
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
    fineafterperDay: {
      type: Number,
     
    },
    status:{
      type:String,
    }
   
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

