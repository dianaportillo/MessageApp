const router = require('express').Router();
const {Todo, User} = require('../models');
const bcrypt = require('bcryptjs');


router.post('/todos', async (req, res) => {
    if(!req.session.isLoggedIn){
        res.status(401).json({error: 'You must be logged in'});
    }

    try {
        const newTodo = await Todo.create({
            todo: req.body.todo,
            userId: req.session.user.id,
        });

        res.json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});

    }
});


router.post('/room', async (req, res, next) => {
    res.render('/room', {title: 'Chat Room'});
});


router.post('socket', async (req,res, next) => {
    res.render('/socket');
})

router.post('/signup', async (req, res) => {
    try { 
        const newUser = await User.create(req.body);
        
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json(newUser);
        })
     } catch (error) {
        console.error(error);
            res.status(500).json({error})
    }
});


router.post('/signup', async (req, res) => {
    try {
        // adds signup data to database
        // post data: { username: '', password: ''}
        const newUser = await User.create(req.body);

        // saves user session with new user data
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json(newUser);
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});


router.post('/signin', async (req, res) => {
    try {
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

if(!existingUser) {
    return res.status(401).json({error: 'invalid credentials'});
}

const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);

    if(!passwordMatch){
    return res.status(401).json({error: 'Invalid Credentials'});
}

    req.session.save(() => {
    req.session.user = existingUser;
    req.session.isLoggedIn = true;
    res.json({success: true});
});

    } catch (error) {
    console.error(error);
    res.status(500).json({error});
}
});

router.post('/signout', async (req, res) => {
    if(req.session.isLoggedIn){
        req.session.destroy(() => {
            res.json({success: true});
        });
    }
});



module.exports = router;

