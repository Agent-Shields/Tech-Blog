const { Post } = require('../models');

const postdata = [
    // expects {'title': 'thisTitle', '}
    {
        "title": "Think not about what is to come or what has been",
        "content": "only about where you are now and how amazing that is"
    },
    {
        "title": "Tired of getting less than 6 hours of sleep?",
        "content": "go to bed earlier then champ :) "
    },
    {
        "title": "It's been a long day and I would like a nap",
        "content": "nap the day away and sleep will hardly follow"
    },
    {
        "title": "When you're tired but it is too late to nap :(",
        "content": "quit whining"
    },
]

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts