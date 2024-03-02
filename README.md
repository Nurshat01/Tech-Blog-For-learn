# Tech Blog CMS

## Description

A CMS-style blog site where developers can publish articles, blog posts, and share their thoughts and opinions.

## User Story

As a developer who writes about tech, I want a CMS-style blog site so that I can publish articles, blog posts, and my thoughts and opinions.

## Acceptance Criteria

Given a CMS-style blog site,
- When I visit the site for the first time, I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in.
- When I click on the homepage option, I am taken to the homepage.
- When I click on any other links in the navigation, I am prompted to either sign up or sign in.
- When I choose to sign up, I am prompted to create a username and password.
- When I click on the sign-up button, my user credentials are saved, and I am logged into the site.
- When I revisit the site at a later time and choose to sign in, I am prompted to enter my username and password.
- When I am signed in to the site, I see navigation links for the homepage, the dashboard, and the option to log out.
- When I click on the homepage option in the navigation, I am taken to the homepage and presented with existing blog posts that include the post title and the date created.
- When I click on an existing blog post, I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment.
- When I enter a comment and click on the submit button while signed in, the comment is saved, and the post is updated to display the comment, the comment creator’s username, and the date created.
- When I click on the dashboard option in the navigation, I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post.
- When I click on the button to add a new blog post, I am prompted to enter both a title and contents for my blog post.
- When I click on the button to create a new blog post, the title and contents of my post are saved, and I am taken back to an updated dashboard with my new blog post.
- When I click on one of my existing posts in the dashboard, I am able to delete or update my post and taken back to an updated dashboard.
- When I click on the logout option in the navigation, I am signed out of the site.
- When I am idle on the site for more than a set time, I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts.

## Technologies Used

- Frontend: HTML, CSS, JavaScript, Handlebars.js
- Backend: Node.js, Express.js, Sequelize
- Database: MySQL

## Installation

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Set up your MySQL database and update the database configuration in `config/config.json`.
4. Run the database migrations with `npx sequelize-cli db:migrate`.
5. Start the application with `npm start`.

## Usage

1. Visit the homepage to see existing blog posts.
2. Sign up or sign in to create, update, or delete your own posts.
3. Use the dashboard to manage your blog posts.

## View
![alt text](view/Logs.png)
![alt text](<view/Post board page.png>)
![alt text](view/Loginpage.png)
![alt text](<view/Create a post.png>)
![alt text](<view/Add comments page.png>)

## Deployments page
link: 

---

