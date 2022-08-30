const mongoose = require('mongoose');

mongoose.connect( `mongodb+srv://Siddhesh:Siddhesh3341@cluster0.cn61z.mongodb.net/Hi?retryWrites=true&w=majority`, {
  useNewUrlParser:true,
}).then(()=>{
  console.log("connection succesful")
}).catch((e)=>{
  console.log("No connection with Database !!!" )
  console.log(e)
})