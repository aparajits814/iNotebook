const express=require('express');
const router=express.Router();
const notes=require('../Schemas/Notes.js');
const jwt=require('jsonwebtoken');
const secret="MERNSTACKINOTEBOOKPROJECT";

router.post('/addnote',async(req,res)=>{
    const token=req.header('authtoken');
   if(!token){
       return res.status(400).json({msg:"Authentication Error"});
   }
   const data =jwt.verify(token,secret);
   const user_id=data.user.id;
   await notes.create({
       userid:user_id,
       title:req.body.title,
       description:req.body.description
   })
    res.json({msg:"Note Added!"});
});

module.exports=router;