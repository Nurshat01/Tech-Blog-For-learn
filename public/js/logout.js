const errorMessage = 'Failed to log out.';

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(errorMessage);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
