const newCommentHandler = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#message').value.trim();

  if (message) {
    const blogId = document.querySelector('.new-comment-btn').dataset.blogId;
    console.log('blogId', blogId);
    const response = await fetch(`/api/blogs/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/blog/${blogId}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);
