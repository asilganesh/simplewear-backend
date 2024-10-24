require('dotenv').config()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
    registerUser: async (req, res) => {

        try {
            const data = req.body
            console.log(data)

            const userExists = await User.findOne({ mail: data.mail })

            if (userExists) {
                return res.status(401).json({ message: "User Already exits" })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(data.password, salt)
            data.password = hashedPass
            const responseData = await User.create(data)

            return res.status(200).json({ message: "Registered Successfully" })

        }
        catch (err) {
            console.error('Cause:', err.cause);
            res.status(500).json({ message: "Error Ocurred, Plese try again", error: err.message })
        }
    },

    loginUser: async (req, res) => {

        try {
            const { mail, password } = req.body

            const user = await User.findOne({ mail })

            if (!user) {
                return res.status(400).json({ message: "User not found" })
            }

            const passMatch = await bcrypt.compare(password, user.password)

            if (!passMatch) {
                return res.status(400).json({ message: "Ivalid Credentials" })
            }

            userData = {
                id: user._id,
                name: user.name,
                mail: user.mail,
                type: user.type
            }

            jwt.sign(userData, process.env.SECRET_KEY, (err,data) => {
                if(err){
                   return  res.json(err)
                }
                return res.status(200).json({ message: "Login Successful", userInfo:{userData, token:data} })

            })

            
        


        }
        catch (err) {
            console.error('Cause:', err.cause);
            res.status(500).json({ message: "Error Occured", error: err.message })
        }
    }
}