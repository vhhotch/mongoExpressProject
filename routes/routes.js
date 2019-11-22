const {Router} = require('express');
const router = Router();

const UserModel = require('../models/user.js');

let hasAccess = false;

router.get('/', (req, res) => {
res.render('index');
});

router.get('/signup', (req, res) => {
    if (!hasAccess) {
        res.render('signup');}
    else {
        res.redirect ('profile')
    }
});

router.get('/login', (req, res) => {
    if (!hasAccess) {
        res.render('login');}
    else {
        res.redirect ('profile')
    }
});

router.get('/profile', (req, res) => {
    if (hasAccess){
        res.render('profile');
    }
    else {
        res.redirect('/')
    }
})


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
    
    let emailInputted = req.body.email;
    let password = req.body.password;

    let info;
    
    let isauser = await UserModel.find({email:emailInputted})

    if (isauser.length==0){

        info = "This email or password does not exist"

        res.render ('login', {info})
    }

    else if (password == isauser[0].password) {
        let name = `Hello ${isauser[0].name}`
        let email = `Your email is ${isauser[0].email}`
        hasAccess = true;
        res.render ('profile', {name, email})
    }
    
    else {
        info = "This email or password does not exist"

        res.render ('login', {info})
    }

})


router.post('/insert', async (req, res) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    

    let isauser = await UserModel.find({email:email})

    if (isauser.length==0){
        const user = new UserModel ({
        name: name,
        email: email,
        password: password
    })
        user.save();
        res.render('profile',{name, email})
    }
    else {
       let info = "This account exists already, please login"
       res.render ('login', {info})
    }
});

module.exports = router;
