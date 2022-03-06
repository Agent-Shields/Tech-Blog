// import all modules
const Comment = require('./Comment')
const Post = require('./Post')
const User = require('./User')

// Create Associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
    through: Comment,
    as: 'commented_posts',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

Post.belongsToMany(User, {
    through: Comment,
    as: 'commented_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
