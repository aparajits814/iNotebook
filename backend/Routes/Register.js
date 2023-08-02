const express=require('express');
const router=express.Router();
const User=require('../Schemas/User.js');
const bcryptjs=require('bcryptjs');
router.post('/register',async(req,res)=>{
    const userData=await User.findOne({email:req.body.email});
    if(userData!=null){
        return res.status(400).json({msg:"User Already Exists", msgType:"warning"});
    }else{
        const salt=await bcryptjs.genSalt(10);
        const secPass=await bcryptjs.hash(req.body.password,salt);
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });
        return res.json({msg:"Registered Successfully!", msgType:"success"});
    }

});
module.exports=router;