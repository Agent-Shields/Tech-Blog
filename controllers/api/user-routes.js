const router = require('express').Router();
const { Post } = require('../../models');
const User = require("../../models/User")

// Route get users
router.get("/", (req, res) => {
    User.findAll({
        attributes:
        {exclude: ['password']}
    })
    .then((dbUserData) => {
        res.json(dbUserData)
    })
})

// Get single user by id
router.get("/:id", (req, res) => {
    User.findAll({
        attributes:
        {exclude: ['password']},
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then((dbUserData) => {
        res.json(dbUserData)
    })
})

// Route create a user
router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
    .then((dbUserData) => {
        res.json(dbUserData)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Route update user password
router.put('/:id', (req,res) => {
    // expects {username: 'username', password: 'password'}
    // pass in req.body instead to only update what's passed through
    User.update(req.body), {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    }
})

// Route to login existing users
router.put('/login', (req, res) => {
    // expects {username: 'username', password: 'password'}
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: 'Username does not exist!'})
            return;
        }

        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'})
            return;
        }

        res.json({user: dbUserData, message: 'You are now logged in!'})
    })
})

module.exports = router;