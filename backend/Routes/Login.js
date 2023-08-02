const express=require('express');
const router=express.Router();
const User=require('../Schemas/User.js');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const secret="MERNSTACKINOTEBOOKPROJECT";

router.post('/login',async(req,res)=>{
    const userData=await User.find({email:req.body.email});
    if(userData.length===0){
        return res.status(400).json({msg:"Incorrect Email", msgType:"incorrect_email"});
    }
    const cmp=await bcryptjs.compare(req.body.password,userData[0].password);
    if(cmp===false){
        return res.status(400).json({msg:"Incorrect Password", msgType:"incorrect_pass"}); 
    }else{
        let data={
            user:{
                id:userData[0]._id
            }
        }
        const AuthToken=jwt.sign(data,secret);
        return res.json({msg:"Logged in Successfully", msgType:"success",AuthToken:AuthToken});
    }

});
module.exports=router;