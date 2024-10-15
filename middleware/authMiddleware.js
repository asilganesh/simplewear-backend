require('dotenv').config()

const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next) => {

    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(" ")[1]

    if(!token) {
      return   res.status(401).json({message: "Token not found"})
    }
    
    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

        if(err){
            res.status(403).json({message: "Invalid token"})
        }

        req.userData = data

    next()
    })

}

module.exports = verifyToken