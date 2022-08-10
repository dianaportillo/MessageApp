const router = require('express').Router();
const apiController = require('./apiController')
const {User} = require('../models');
const {Todo} = require('../models');

router.get('/', (req, res) => {
    res.render('landingPage', { 
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/signin', (req,res) => {
    res.render('signin', {
        isLoggedIn: req.session.isLoggedIn,
    });
});


router.get('/users', async (req, res) => {
    try {
        const dbUsersData = await User.findAll();
        
        const users = dbUsersData.map(dbUser => dbUser.get({plain: true}));
        console.log(users);
        res.render('users', {
            users,
            loggedInUser: req.session.user || null,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        console.log('Err L:25 homepageController', error);
        res.status(500).json({error});
    }  
});


router.get('/users/:userId', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.userId);
        const user = userData.get({plain: true});

        res.render('userProfile', {user});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/todos', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/');
    }

    try {
        const userTodosData = await Todo.findAll({
            where: {
                userId: req.session.user.id,
            },
        });

        const todos = userTodosData.map(todo => todo.get({plain: true}));

        res.render('todos', {
            todos,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        res.status(500).json({error});
    }
});


router.get('/room', async (req, res) => {
    res.render('room')
});

router.use('/api', apiController);

module.exports = router;