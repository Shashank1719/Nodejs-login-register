const express = require('express');
const User = require('../models/userSchema');
const router = express.Router();
const bcrypt = require('bcrypt');
require('../db/connection')

router.get('/', (req, res) => {
    res.send('Welcome to rdx KinG k website pe')
})
router.get('/about', (req, res) => {
    res.send('Hello About!')
})
// router.get('/about', middleware, (req, res) => {
//     res.send('Hello About!')
// })
router.get('/contact', (req, res) => {
    res.send('Hello contact!')
})
router.get('/signin', (req, res) => {
    res.send('Hello signin!')
})
router.get('/signup', (req, res) => {
    res.send('Hello signup!')
})
router.get('/location', (req, res) => {
    res.send('Hello location!')
})

// Using Promises

// router.post("/register", (req,res)=>{
//     const {name, email, phone, work, password} = req.body;
//     if(!name || !email || !phone || !work || !password){
//         res.status(422).json({message: "Please fill all the details"});
//     }

//     User.findOne({email:email}).then((userExist) => {
//         if(userExist){
//             res.status(422).json({message: "User Already Exist with same email Id"});
//         }

//         const user = new User({name, email, phone, work, password});

//         user.save().then(() => {
//             res.status(201).json({message: "User Added Successfully"});
//         }).catch((err) => {
//             res.status(500).json({message: "Unkknown Error Occured"});
//         })
//     }).catch(err => { console.log(err)});
// })


// Using async await

router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, work, password, cpassword } = req.body;
        if (!name || !email || !phone || !work || !password || !cpassword) {
            res.status(422).json({ message: "Please fill all the details" });
        } else {
            const userExist = await User.findOne({ email: email });
            if (userExist) {
                res.status(422).json({ message: "User Already Exist with same email Id" });
            } else {
                if (password != cpassword) {
                    res.status(422).json({message: "Passwords not matching"});
                } else {
                    const user = new User({ name, email, phone, work, password, cpassword });
                    console.log(`${user} registered successfully`);
                    const userRegister = await user.save();
                    console.log(userRegister);
                    res.status(201).json({ message: "User Added Successfully" });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})

// login route

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Please Fill all the Required Data" });
        } else {
            const userLogin = await User.findOne({ email: email });
            if (!userLogin) {
                res.status(400).json({ emailNoteRegisteredError: "Email could not found!\nPlease Register and then try again." })
            } else {
                const isMatch = await bcrypt.compare(password, userLogin.password);
                if(!isMatch){
                    res.status(400).json({ error: "Invalid Credentials" });
                }else{
                    res.status(200).json({ message: "Signin Successfull..." });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;