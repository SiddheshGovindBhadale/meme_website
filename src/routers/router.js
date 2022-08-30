const express = require('express');
const router = new express.Router();
const path = require("path")
const ejs = require("ejs")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")




const Admin = require("../../src/models/admin")
const adminAuth = require("../../src/medalware/adminAuth")
const mainAdminAuth = require("../../src/medalware/mainAdmin")


/*router.get("/" , async (req , res) => {
  try{
     const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2022-04-02&sortBy=publishedAt&apiKey=d14dfb0bffa04724b5853e966b38aedc`)
     res.render('index', { articles : newsAPI.data.articles })
  }catch(err){
     res.render('index', { articles : null })
  }
})*/

router.get("/" , async(req , res) => {
  try{
    res.send("hello")
  }catch(err){
    console.log(err)
  }
})



router.get( "/adminsloginL" , async (req , res) =>{
  res.render("forAdmin/adminLogin")
})

router.get( "/addAdminL" , mainAdminAuth ,async (req , res) =>{
  res.render("forAdmin/addAdmin" ,{admin:req.admin})
})





/********* Admin **********/
// Admin registeration
router.post("/admin" ,mainAdminAuth, async (req , res) => {
  try{
     const password = req.body.password
     const cPassword = req.body.conPassword
     
     if(password === cPassword){
        const resisterAdmin = new Admin({
            name : req.body.name,
            username : req.body.username,
            password : password,
            conPassword : cPassword,
            isAdmin : "false"
        })
        
        const token = await resisterAdmin.generateToken()
        
        res.cookie("jwt" , token , {
            expires : new Date(Date.now + 60000),
            httpOnly : true
        })
        
        const resisterd = await resisterAdmin.save()
        res.status(201).render("forAdmin/addAdmin" ,{admin:resisterAdmin})
     }else{
        res.send("password are not matching")
     }
  }catch(e){
     console.log(e)
  }
})

//patch method use for create admin method
router.patch('/admin/:id', async(req, res) => {
  try{
     const _id = req.params.id;
     const updateAdmin = await Admin.findByIdAndUpdate(_id,req.body,{
       new:true
     });
     res.send(updateAdmin);
  }catch(e){
     res.status(500).send(e);
  }
})

// admin login
router.post("/adminlogin" , async (req , res) => {
  try{
     const username = req.body.username
     const password = req.body.password
     
     const userName = await Admin.findOne({username : username})
     const isMatch = await bcrypt.compare(password , userName.password)
     const token = await userName.generateToken()
     
     res.cookie("jwt" , token , {
         expires : new Date(Date.now + 60000),
         httpOnly : true
     })
     
     if(isMatch){
        res.status(201).render("index" , {admin:userName})
     }else{
        res.send("Invalid Login details")
     }
  }catch(e){
     console.log(e)
  }
})

// admin logout
router.get( "/adminlogout" , adminAuth , async(req , res) =>{
  try{
    
    req.admin.tokens = req.admin.tokens.filter((dbtoken) => {
       return dbtoken.token === req.token;
    })
    
    res.clearCookie("jwt")
    await req.admin.save()
    res.render("forAdmin/adminLogin")
  }catch(e){
    console.log(e)
  }
})

// get Admin
router.get('/admin', async(req, res) => {
  try{
     const getAdmin = await Admin.find({});
     res.send(getAdmin);
  }catch(e){
     res.status(400).send(e);
  }
})

// delete admin
router.delete('/admin/:id', async(req, res) => {
 try{
    const DeleteAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.send(DeleteAdmin);
 }catch(e){
    res.status(500).send(e);
 }
})




// video upload route
router.post("/video" , async (req , res) => {
  try{
     const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2022-04-02&sortBy=publishedAt&apiKey=d14dfb0bffa04724b5853e966b38aedc`)
     res.render('index', { articles : newsAPI.data.articles })
  }catch(err){
     res.render('index', { articles : null })
  }
})


module.exports = router;