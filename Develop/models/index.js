const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog };