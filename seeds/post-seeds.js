const { Post } = require('../models');

const postdata = [
    // expects {'title': 'thisTitle', '}
    {  
        "title": "Think not about what is to come or what has been",
        "content": "only about where you are now and how amazing that is",
        "user_id": 1
    },
    {   
        "title": "Tired of getting less than 6 hours of sleep?",
        "content": "go to bed earlier then champ :) ",
        "user_id": 3
    },
    {
        "title": "It's been a long day and I would like a nap",
        "content": "nap the day away and sleep will hardly follow",
        "user_id": 6,
    },
    {
        "title": "this right here is a title",
        "content": "something like this text",
        "user_id": 2,
    },
    {
        "title": "So what is going on here?",
        "content": "Lorem ipsummy bruh",
        "user_id": 7,
    },
    {
        "title": "Stardew Valley is life",
        "content": "You can't really enjoy joja cola",
        "user_id": 5,
    },
    {
        "title": "Want to talk about godzilla",
        "content": "Shin godzilla criminally underrated film",
        "user_id": 4,
    },
    {
        "title": "What is your strangest memory from childhood?",
        "content": "Living across from a cemetary brought lots of strange events",
        "user_id": 9,
    },

]

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts