// Global error messages
const ERROR_MESSAGES = {
  CREATE: 'Failed to create.',
  UPDATE: 'Failed to update.',
  DELETE: 'Failed to delete.',
  FORM: 'Fill out the form.',
};

// Global URIs/URLs
const API_URL = '/api/blogs';

// Global function to show alerts
const showAlert = (message) => {
  alert(message);
};

// Get the data from the user inputs and fetch the backend api for creating a new blog.
const createBlogHandler = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();
  if (title && content) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        showAlert(ERROR_MESSAGES.CREATE);
      }
    } catch (e) {
      showAlert(ERROR_MESSAGES.CREATE);
    }
  } else {
    showAlert(ERROR_MESSAGES.FORM);
  }
};

// Get the data from the user inputs and fetch the backend api for updating the blog.
const updateBlogHandler = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();
  const id = +location.href.split('/')[location.href.split('/').length - 1];
  if (title && content) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        showAlert(ERROR_MESSAGES.UPDATE);
      }
    } catch (e) {
      showAlert(ERROR_MESSAGES.UPDATE);
    }
  } else {
    showAlert(ERROR_MESSAGES.FORM);
  }
};

// Get the blog id from the url and fetch the backend api for deleting the blog.
const deleteBlogHandler = async () => {
  const id = +location.href.split('/')[location.href.split('/').length - 1];
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (response.ok) {
      document.location.replace('/');
    } else {
      showAlert(ERROR_MESSAGES.DELETE);
    }
  } catch (e) {
    showAlert(ERROR_MESSAGES.DELETE);
  }
};

document
  .querySelector('#create-blog')
  ?.addEventListener('click', createBlogHandler);

document
  .querySelector('#update-blog')
  ?.addEventListener('click', updateBlogHandler);

document
  .querySelector('#delete-blog')
  ?.addEventListener('click', deleteBlogHandler);
