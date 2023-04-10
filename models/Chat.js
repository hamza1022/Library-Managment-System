const mongoose = require("mongoose")
const chatSchema = mongoose.Schema(
    {
       
         msg: {type:String},
         by: {
           type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
           },
           to :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'

           }
         
 
     },
     {timestamps:true},
     );

module.exports = mongoose.model('Chat',chatSchema)