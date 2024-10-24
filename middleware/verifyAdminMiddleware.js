require('dotenv').config()

const jwt = require('jsonwebtoken')


const verifyAdmin = (req,res,next) => {

  
    const authorization = req.headers['authorization']
    
   
    const token = authorization && authorization.split(" ")[1]

    if(!token) {
      return   res.status(401).json({message: "Token not found"})
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

        if(err){
            return res.status(403).json({message: "Invalid token"})
        }

        req.userData = data

        if(data.type !== 'admin'){
           
            return res.status(400).json("Please login with admin details")
        }
        next()

    })

}

module.exports = verifyAdmin