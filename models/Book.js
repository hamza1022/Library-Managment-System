const mongoose = require("mongoose")
const bookSchema = mongoose.Schema(
    {
       
         bookName: {type:String},
         bookPrice: {type:Number},
         bookTitle : {type:String},
         status:{type:String},
         Author: {
           type: mongoose.Schema.Types.ObjectId,
             ref: 'Author'
           }
 
     },
     {timestamps:true},
     );

module.exports = mongoose.model('Book',bookSchema)