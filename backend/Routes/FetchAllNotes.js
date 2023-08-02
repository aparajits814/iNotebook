const express=require('express');
const router=express.Router();
const notes=require('../Schemas/Notes.js');
const jwt=require('jsonwebtoken');
const secret="MERNSTACKINOTEBOOKPROJECT";

router.post('/fetchallnotes',async(req,res)=>{
    const token=req.header('authtoken');
   if(!token){
       return res.status(400).json({msg:"Authentication Error"});
   }
   const data =jwt.verify(token,secret);
   const user_id=data.user.id;
   const NotesData= await notes.find({userid:user_id});
   res.json(NotesData);
});

module.exports=router;