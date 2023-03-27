const mongoose = require("mongoose")
const bookSchema = mongoose.Schema(
    {
       
         name: {type:String},
         price: {type:Number},
         title : {type:String},
         status:{type:String},
         Author: {
           type: mongoose.Schema.Types.ObjectId,
             ref: 'Author'
           }
 
     },
     {timestamps:true},
     );

module.exports = mongoose.model('Book',bookSchema)