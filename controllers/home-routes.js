const router = require('express').Router();
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')

// get all posts
router.get('/', (req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at']
                // for whatever reason this include clause is giving an error : include.attributes.some is not a function
                // include: {
                //     model: User,
                //     attributes: 'username'
                // }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }))
        res.render('homepage',{ posts });
    })
    .catch(err => {
        console.log(err),
        res.status(500).json(err)
    })
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;
