const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog, Comment };