# Blog-Frog
Relevancy-based tech networking

  ![](https://img.shields.io/badge/javascript-100-yellow?logo=javascript)
  ![](https://img.shields.io/badge/mysql2-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/sequelize-dep-blue?logo=sequelize)
  ![](https://img.shields.io/badge/dotenv-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/express.js-dep-blue?logo=express)
  ![](https://img.shields.io/badge/bcrypt-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/identicon.js-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/md5-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/bootstrap-dep-blue?logo=npm)
  ![](https://img.shields.io/badge/expressHandlebars-dep-blue?logo=npm)

  ## Description

  This application is deployed to Heroku.

  Blog Frog is a tech networking app that lends itself to people who work with technology and are looking for a custom networking solution.

  The bones behind the app are built with sequelize and mysql. This is where users, posts, comments, and hopefully in the future images are stored. The entire app is served via express.js to a handlebars template engine and frontend javascript.

  Keep your users happy with a sign up and login feature which will allow only registered users to post and comment.

  ## Table of contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Maintainers](#maintainers)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Credits](#credits)
  * [License](#license)

  ## Deployment
  [Heroku Deployment](https://frognetwork.herokuapp.com/)

  ## Installation
  If you are planning on cloning the repository and deploying it yourself, these are the steps necessary to do so and be able to test along the way:
  Make sure you have the latest stable version of node installed: ```node --version```.
  Make sure you have installed mysql locally on your system. Check this with ```mysql --version```.

  Clone the repository. Then in your terminal enter ```node install``` which will install all of the dependencies.

  Create a .env file in the root of the repo and paste the following into it with your mysql password:
  ```
    DB_NAME="ecommerce_db"
    DB_USER="root"
    DB_PW="your password here"
  ```

  This file will not be pushed to your repository if you choose to push it.

  ## Usage
  If you will not be using the Heroku deployment and instead wish to deploy yourself:
  First, in your mysql shell enter the following command:
  ```
  source db/schema.sql
  ```
  then quit the sql shell.
  Next, in your terminal enter ```npm start```.

  Now navigate to your browser and the app homepage should be running in the root of localhost.

  ## Maintainer
  [@Daniel Harned](https://github.com/DrDano)

  Email: [danielharned@gmail.com](mailto:danielharned@gmail.com)

  ## Contributing
  Fork the project if you would like to contribute. You can deploy this application with any tool once you have cloned the repo.

  ## Credits
  
  * [mysql2](https://www.npmjs.com/package/mysql2)
  * [sequelize](https://sequelize.org/)
  * [express.js](https://expressjs.com/)

  ## License
  Licensed under [MIT](https://choosealicense.com/licenses/mit) 2022 
  
  ![](https://img.shields.io/badge/license-MIT-blue)