const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
    registerUser: async(req,res) => {

        try{
            const data = req.body
            
            const userExists =  await User.findOne({mail: data.mail})

            if(userExists){
                res.status(401).json({message: "User Already exits"})
            }

            const salt =  await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(data.password,salt)
            data.password= hashedPass
            const responseData = await User.create(data)

            res.status(200).json({message: "Registered Successfully"})

        }
        catch(err) {
            res.status(500).json({message:"Error Ocurred, Plese try again", error: err.message})
        }
    },

    loginUser: async(req,res) => {

        try{
            const {mail, password} = req.body

            const user = await User.findOne({mail})

            if(!user){
                res.status(400).json({message: "User not found"})
            }

            const passMatch = await bcrypt.compare(password,user.password)
            
            if(!passMatch){
                res.status(400).json({message: "Ivalid Credentials"})
            }

            res.status(200).json({message:"Login Successful"})


        }
        catch(err){
            res.status(500).json({message: "Error Occured", error: err.message})
        }
    }
}