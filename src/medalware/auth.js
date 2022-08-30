const jwt = require("jsonwebtoken")
const User = require("../models/users")

const auth = async(req , res , next) => {
   try{
      const token = req.cookies.jwt
      const verifyUser = jwt.verify(token , "thisisFaizalhomoglobinlevelcareandcompanynameishbccareandthiswrbsitecreatedbysiddheshbhadale")
      const user = await User.findOne({_id : verifyUser._id})
      req.token = token
      req.user = user
      next()
   }catch(e){
      res.status(401).render("register")
   }
}

module.exports = auth