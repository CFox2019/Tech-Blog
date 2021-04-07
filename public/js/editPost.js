const updateHandler = async (event) => {
  event.preventDefault();

  const blogId = document.querySelector('#update-blog').dataset.blogId;
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (blogId && title && content) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update blog');
    }
  }
};

const deleteHandler = async (event) => {
  event.preventDefault();

  const blogId = document.querySelector('#delete-blog').dataset.blogId;
  if (blogId) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

document
  .querySelector('#update-blog')
  .addEventListener('click', updateHandler);

document
  .querySelector('#delete-blog')
  .addEventListener('click', deleteHandler);
