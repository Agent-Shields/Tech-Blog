const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models')
const withAuth = require('../../utils/auth');

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
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: 'username'
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        // user_id: req.session.user_id
    })
    .then(dbPostData => {
        res.json(dbPostData)
    })
})



module.exports = router;