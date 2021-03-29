const UserSerializer = require('./UserSerializer');
const { format_date } = require('../../utils/helpers')

class BlogSerializer {
    constructor(blog) {
        this.id = blog.id;
        this.title = blog.title;
        this.content = blog.content;
        this.date_created = format_date(blog.date_created);
        if (blog.user) {
            this.user = new UserSerializer(blog.user);
        }
    }
};

module.exports = BlogSerializer;