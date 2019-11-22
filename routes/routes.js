const {Router} = require('express');
const router = Router();

const UserModel = require('../models/user.js');

router.get('/', (req, res) => {
res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});

// router.post('/login', async (req, res) => {
    
//     let email = req.body.email;
//     // let password = req.body.password;
    
//     let info;
//     let name;
    
//     checkUser = await UserModel.find({email:email})

//             if (checkUser == undefined) {
//                 info = "you DO NOT EXIST!"
//             }
//             else {
//                 info = "you exist!"
//                 res.render ('login', {info})
//             }
//     });
//     //compare the email and password to the db

//     //if correct, render profile with profile information
//     //if not existing then render the signup page


router.post ('/login', async (req, res)=>{
    
    let email = req.body.email;

    let info;
    
    let isauser = await UserModel.find({email:email})

    if (isauser.length==0){

        info = "This email or password does not exist"

        res.render ('login', {info})
    }
    
    else {
        let name = `Hello ${isauser[0].name}`
        let email2 = `Your email is ${isauser[0].email}`
        res.render ('profile', {name, email2})
    }

})


router.post('/insert', (req, res) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
    const user = new UserModel ({
        name: name,
        email: email,
        password: password
    })

    user.save();
    res.render('index')
});

module.exports = router;
