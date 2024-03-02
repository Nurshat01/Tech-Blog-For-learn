const apiUrls = {
  login: '/api/users/login',
  signup: '/api/users'
};

const errorMessages = {
  failedLogin: 'Failed to log in.',
  failedSignup: 'Failed to sign up.'
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  const password = document.querySelector('#password-login').value.trim();
  const username = document.querySelector('#username-login').value.trim();

  if (username && password) {
    const response = await fetch(apiUrls.login, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(errorMessages.failedLogin);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch(apiUrls.signup, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(errorMessages.failedSignup);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

document.querySelectorAll('.instead').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    document
      .querySelectorAll('.form-wrapper')
      .forEach((el) => el.classList.remove('hide'));
    e.target.parentElement.parentElement.parentElement.classList.add('hide');
  });
});
