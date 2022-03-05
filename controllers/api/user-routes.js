const User = require("../../models/User")

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

        // res.json({ user: dbUserData})

        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'})
            return;
        }

        res.json({user: dbUserData, message: 'You are now logged in!'})
    })
})