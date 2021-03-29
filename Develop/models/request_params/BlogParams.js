class BlogParams {
  constructor(body) {
    this.title = body.title;
    this.content = body.content;
  }
}

module.exports = BlogParams;