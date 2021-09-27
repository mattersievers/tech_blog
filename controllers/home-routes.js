const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User} = require('../models');

router.get('/', (req,res) => {
    console.log(req)

    Post.findAll({
        attributes: [
            'id',
            'blog_title',
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
        res.render('homepage', posts);
    })
    .catch( err => {
        res.status(500).json(err);
    });
});

module.exports = router;