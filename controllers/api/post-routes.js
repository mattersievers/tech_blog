const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const { response } = require('express');

router.get('/', (req, res) => {
    console.log('====================');
    Post.findAll({
        attributes: [
            'id',
            'blog_title',
            'blog_text',
            'created_at'
        ],    
        order: [['created_at', 'DESC']],
        include: 
            {
                model: User,
                attributes: ['username']
            }
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req,res) => {
    Post.create({
        blog_title: req.body.blog_title,
        blog_text: req.body.blog_text,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch( err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;