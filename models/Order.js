
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
    fineAfterPerDay: {
      type: Number,
      default : 50
    },
    fine:{
      type:String,
    },
    status:{
      type:String,
    }
   
  },
  {timestamps: true}
);


  orderSchema.methods.toJSON = function () {
    return {
      _id:this._id,
      books: this.books,
      customer: this.customer,
      fineAfterPerDay : this.fineAfterPerDay,
      status:this.status,
      fine:this.fine,
      totalAmount:this.totalAmount,
    
     
    };
  };
module.exports = mongoose.model("Order", orderSchema);

