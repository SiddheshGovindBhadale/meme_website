const mongoose = require('mongoose');

mongoose.connect( 
'mongodb://Siddhesh:Siddhesh3341@cluster0-shard-00-00.cn61z.mongodb.net:27017,cluster0-shard-00-01.cn61z.mongodb.net:27017,cluster0-shard-00-02.cn61z.mongodb.net:27017/Hi?ssl=true&replicaSet=atlas-924d41-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser:true,
}).then(()=>{
  console.log("connection succesful")
}).catch((e)=>{
  console.log("No connection with Database !!!" )
  console.log(e)
})
