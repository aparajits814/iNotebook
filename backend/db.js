const mongoose=require('mongoose');
require('dotenv').config();
const Mongo=process.env.MONGO_URI;
const connectToMongo=async()=>{
    await mongoose.connect(Mongo);
    console.log("CONNECTED");
}
module.exports=connectToMongo;