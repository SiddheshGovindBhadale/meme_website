const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  conPassword:{
    type:String,
    required:true
  },
  isAdmin:{
    type:String,
    required:true
  },
  tokens : [{
    token :{
      type:String,
      required:true
    }
  }]
})



/* generate and store jwt */
adminSchema.methods.generateToken = async function(){
   try{
     const token = jwt.sign({_id : this._id.toString()} , process.env.SECRET_KEY)
     this.tokens = this.tokens.concat({token:token})
     await this.save()
     return token;
   }catch(e){
     console.log(e)
   }
}


// bcrypt password
adminSchema.pre("save" , async function(next){
   if(this.isModified("password")){
       this.password = await bcrypt.hash(this.password , 10)
       //this.conPassword = undefined
   }
   
   next()
   
})

const Admin = new mongoose.model("Admin" , adminSchema );

module.exports = Admin;