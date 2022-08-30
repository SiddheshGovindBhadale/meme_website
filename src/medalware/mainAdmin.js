const jwt = require("jsonwebtoken")
const Admin = require("../models/admin")

const mainAdminAuth = async(req , res , next) => {
   try{
      const token = req.cookies.jwt
      const verifyAdmin = jwt.verify(token , "isFaizalhomoglobinlevelcareandcompanynameishbccareandthiswrbsitecreatedbysiddheshbhadale")
      
      const admin = await Admin.findOne({_id : verifyAdmin._id})
      
      req.token = token
      req.admin = admin
      if(admin.isAdmin == "true"){
         next()
      }else{
         res.render("forAdmin/bookingData" , {admin:req.admin})
      }
   }catch(e){
      res.status(401).render("forAdmin/adminLogin")
      console.log(e)
   }
}

module.exports = mainAdminAuth