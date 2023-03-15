const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
{
  name: {type: String, required: true},
  age: { type: Number },
  country:{type:String}
  
},
{timestamps:true},

);

module.exports = mongoose.model('Author', authorSchema);