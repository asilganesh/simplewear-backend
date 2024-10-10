const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

module.exports = {
    registerAdmin: async (req, res) => {

        try {

            const data = req.body

            const adminExists =  await Admin.findOne({mail: data.mail})

            if(adminExists){
                res.status(401).json({message: "User Already exits"})
            }

           const salt =  await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash( data.password,salt)
            


            data.password = hashedPass

            const responseData = await Admin.create(data)

            res.status(200).json("Registered Successfully")

        }
        catch (err) {
            res.status(500).json({ message: "Error Ocurred, Please try again", error: err.message })
        }

    },

    loginAdmin: async (req, res) => {

        try {
            const { mail, password } = req.body

            const admin = await Admin.findOne({ mail })

            if (!admin) {
                res.status(400).json({ message: "Admin not found " })
            }

            const passMatch = await bcrypt.compare(password, admin.password)

            if (!passMatch) {
                res.status(400).json("Ivalid Credentials")
            }

            res.status(200).json("Login Successful")

        }
        catch (err) {
            res.status(500).json({ message: "Error Ocurred", error: err.message })
        }


    }
}