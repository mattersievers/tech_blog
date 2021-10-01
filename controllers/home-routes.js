const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User} = require('../models');

router.get('/', (req,res) => {

    Post.findAll({
        attributes: [
            'id',
            'blog_title',
            'blog_text',
            'created_at'
        ],
        include: {
            model: User,
            attributes: ['username']
        }
    })
    .then( dbPostData => {
        //pass single object into homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('signup');
});
module.exports = router;