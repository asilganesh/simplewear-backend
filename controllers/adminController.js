const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')




module.exports = {
    registerAdmin: async (req, res) => {

        try {

            const data = req.body

            const adminExists =  await Admin.findOne({mail: data.mail})

            if(adminExists){
              return  res.status(401).json({message: "User Already exits"})
            }

           const salt =  await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash( data.password,salt)
            


            data.password = hashedPass

            const responseData = await Admin.create(data)

            return res.status(200).json("Registered Successfully")

        }
        catch (err) {
            console.error('Cause:', err.cause);
            res.status(500).json({ message: "Error Ocurred, Please try again", error: err.message })
        }

    },

    loginAdmin: async (req, res) => {

        try {
            const { mail, password } = req.body

            const admin = await Admin.findOne({ mail })

            if (!admin) {
                return   res.status(400).json({ message: "Admin not found " })
            }

            const passMatch = await bcrypt.compare(password, admin.password)

            if (!passMatch) {
                return   res.status(400).json("Ivalid Credentials")
            }

            adminData = {
                id: admin._id,
                name: admin.name,
                mail: admin.mail,
                type: admin.type
            }


            jwt.sign(adminData, process.env.SECRET_KEY, (err,data) => {
                if(err){
                   return  res.json(err)
                }
                return res.status(200).json({ message: "Login Successful", token:data })

            })


        }
        catch (err) {
            console.error('Cause:', err.cause);
            res.status(500).json({ message: "Error Ocurred", error: err.message })

        }


    }
}