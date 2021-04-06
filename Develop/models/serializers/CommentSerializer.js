const BlogSerializer = require('./BlogSerializer');
const { format_date } = require('../../utils/helpers')

class CommentSerializer {
    constructor(comment) {
        this.id = comment.id;
        this.message = comment.message;
        this.date_created = format_date(comment.date_created);
        if (comment.user) {
            this.user = new UserSerializer(comment.user);
        }
    }
};

module.exports = CommentSerializer;