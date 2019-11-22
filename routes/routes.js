const {Router} = require('express');
const router = Router();

const UserModel = require('../models/user.js');

router.get('/', (req, res) => {
res.render('index');
});

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
