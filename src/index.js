require('dotenv').config()
const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const ejs = require("ejs")
const bcrypt = require("bcryptjs")
const multer = require("multer")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const axios = require("axios")


//const router = require("../src/routers/router");
require("../src/db/conection.js");
const Admin = require("../src/models/admin")
const Video = require("../src/models/video")
const adminAuth = require("../src/medalware/adminAuth")
const mainAdminAuth = require("../src/medalware/mainAdmin")



const port = process.env.PORT || 5000



const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `upload_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
})

app.use('/product', express.static('upload/images'));




app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(cookieParser())


const public_path = path.join(__dirname , "../public")
const temp_path = path.join(__dirname , "../templates/views")
const partials_path = path.join(__dirname , "../templates/partials")

app.use(express.static(public_path))
app.set("view engine" , "ejs")
app.set("views" , temp_path)




/*---------------------------------*/
app.get( "/adminsloginL" , async (req , res) =>{
  res.render("forAdmin/adminLogin")
})

app.get( "/addAdminL" , mainAdminAuth ,async (req , res) =>{
  res.render("forAdmin/addAdmin" ,{admin:req.admin})
})

app.get( "/upload" ,adminAuth ,async (req , res) =>{
  res.render("forAdmin/upload")
})

/*---------------------------------*/
app.get( "/" , async (req , res) =>{
  try{
    const video = await axios.get(`http://localhost:${port}/video`)
    res.render('index', { videos : video.data })
  }catch(err){
    res.render('index', { videos : null })
    console.log(err)
  }
})

app.get( "/stream/:id" , async (req , res) =>{
  try{
    const video = await axios.get(`http://localhost:${port}/video/${req.params.id}`)
    res.render('video', { video : video.data })
  }catch(err){
    res.render('video', { video : null })
    console.log(err)
  }
})

/*---------------------------------*/
/********* Admin **********/
// Admin registeration
app.post("/admin" ,mainAdminAuth, async (req , res) => {
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
        
        /*res.cookie("jwt" , token , {
            expires : new Date(Date.now() + (30*24*3600000)),
            httpOnly : true
        })*/
        
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
app.patch('/admin/:id', async(req, res) => {
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
app.post("/adminlogin" , async (req , res) => {
  try{
     const username = req.body.username
     const password = req.body.password
     
     const userName = await Admin.findOne({username : username})
     const isMatch = await bcrypt.compare(password , userName.password)
     const token = await userName.generateToken()
     res.cookie("jwt" , token , {
         expires : new Date(Date.now() + (30*24*3600000)),
         httpOnly : true
     })
     
     if(isMatch){
        res.status(201).render("forAdmin/upload")
     }else{
        res.send("Invalid Login details")
     }
  }catch(e){
     console.log(e)
  }
})

// admin logout
app.get( "/adminlogout" , adminAuth , async(req , res) =>{
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
app.get('/admin', async(req, res) => {
  try{
     const getAdmin = await Admin.find({});
     res.send(getAdmin);
  }catch(e){
     res.status(400).send(e);
  }
})

// delete admin
app.delete('/admin/:id', async(req, res) => {
 try{
    const DeleteAdmin = await Admin.findByIdAndDelete(req.params.id);
    res.send(DeleteAdmin);
 }catch(e){
    res.status(500).send(e);
 }
})


/*---------------------------------*/

// video uploading routes
let date = new Date();
let today = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();

app.post('/video', upload.array('image',2), async(req, res ,next) => {
  try{
     const addVideo = new Video({
       image:req.files,
       title: req.body.title,
       category:req.body.category,
       keys: req.body.keys,
       time:req.body.time,
       discretion:req.body.discretion,
       date: today
     })
     const insertVideo =  await addVideo.save();
     res.status(201).send(insertVideo)
     
    
  }catch(e){
     res.status(400).send(e);
     console.log(e)
  }
})

// get video
app.get('/video', async(req, res) => {
  try{
     const getVideo = await Video.find({});
     res.send(getVideo);
  }catch(e){
     res.status(400).send(e);
  }
})

//single get video
app.get('/video/:id', async(req, res) => {
 try{
    const singleVideo = await Video.findById(req.params.id);
    res.send(singleVideo);
 }catch(e){
    res.status(500).send(e);
 }
})

//delete video
app.delete('/video/:id', async(req, res) => {
 try{
    const DeleteVideo = await Video.findByIdAndDelete(req.params.id);
    res.send(DeleteVideo);
 }catch(e){
    res.status(500).send(e);
 }
})

// download video
app.get('/download/:id', async (req, res) => {
  try{
     const video = await Video.findById(req.params.id).exec()
     const file = `${__dirname}/../${video.image[video.image[0].mimetype == "video/mp4" ? 0 : 1].path}`;
     res.download(file);
  }catch(e){
     console.log(e)
  }
});

// stream video
app.get('/stream/video/:id', async(req, res) => {
    try{
      const video = await Video.findById(req.params.id).exec()
      
      const range = req.headers.range;
      if (!range) {
      res.status(400).send("Requires Range header");
      }
      
      const videoPath = `${__dirname}/../${video.image[video.image[0].mimetype == "video/mp4" ? 0 : 1].path}`;;
      const videoSize = fs.statSync(`${__dirname}/../${video.image[video.image[0].mimetype == "video/mp4" ? 0 : 1].path}`).size;
      
      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      
      const contentLength = end - start + 1;
      const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
      };
      
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    }catch(e){
      //console.log(e)
    }
});	

/*---------------------------------*/

app.listen( port , (e) => {
  console.log(`server is running on port ${port}`)
})
