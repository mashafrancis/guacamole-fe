[![CircleCI](https://circleci.com/gh/mashafrancis/guacamole-fe.svg?style=svg&circle-token=9db4655cf67735853e2ca047c4b6fb52cfc198c4)](https://circleci.com/gh/mashafrancis/guacamole-fe)
[![codecov](https://codecov.io/gh/mashafrancis/guacamole-fe/branch/develop/graph/badge.svg?token=5Pw7MjAUvr)](https://codecov.io/gh/mashafrancis/guacamole-fe)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ba779484639543769150bf12f6d5f90a)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mashafrancis/guacamole-fe&amp;utm_campaign=Badge_Grade)

# guacamole-fe
An online travel community to share luggage spaces onboard. (frontend)

<br />
<img width="1440" alt="Activo-Web-screenshot" src="https://res.cloudinary.com/mashafrancis/image/upload/v1551120929/kari4me/kari4me.png">
<br />

## Description
This is a travel tour luggage space sharing app for assisting different tourists ravelling across the globe to collaborate on sharing their luggage spaces.

### Application Heroku Links

-   Backend (Swagger Documentation):
    [swagger-documentation](https://kari4me-api.herokuapp.com/)

-   Frontend (Kari4me App Hosting):
    [kari4me react web app](https://kari4me.herokuapp.com/)

-   Postman collection
    <br />
    <br />
    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f9f0f4ab064818fbf641)

### Development set up
1. Install [`Node JS`](https://nodejs.org/en/).
2. To clone, run `git clone https://github.com/andela/activo-web.git`.
3. `cd` into the root of the **project directory**.
4. Install [`yarn`](https://yarnpkg.com/en/docs/install#mac-stable).
5. Run `yarn install` on the terminal to install dependencies.
6. Create a `.env` file in the root directory of the application. Example of the content of a `.env` file is shown in the `.env.example`
7. Setup local development server.

- In your terminal, execute the following command:
  ```bash
    sudo nano /etc/hosts
  ```
  Otherwise, you can open your hosts file in your editor of choice.
- Add the following line to your `hosts` file:

  ```bash
    127.0.0.1 kari4me.com
  ```

- Save changes and quit the editor.

8. To start the application run `yarn start:dev`

## Testing

**End To End tests** - Run `test:e2e` on the terminal while within the **project root directory**. End to End testing is achieved through use of `http-server` and `Cypress` packages. `http-server` is used to create a simple web server and `Cypress` is used for the browser automation. They will both be installed when you run `yarn install`

**Unit tests** - Run `test:unit` on the terminal while within the **project root directory**. Unit testing is achieved through the use of `jest` package. `jest` is used to test javascript code in React applications.

### API Documentation

Find the link to the API documentation [here](https://github.com/mashafrancis/guacamole-be).
