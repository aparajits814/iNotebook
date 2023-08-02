const mongoose=require('mongoose');
const {Schema}= mongoose;
const NotesSchema=new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:"String",
        required:true
    }
});

module.exports=mongoose.model('notes',NotesSchema);