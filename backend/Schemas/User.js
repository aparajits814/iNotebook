const mongoose=require('mongoose');
const {Schema}= mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        default:"iNotebook User"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:"String",
        required:true
    }
});

module.exports=mongoose.model('users',UserSchema);