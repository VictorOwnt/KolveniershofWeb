<p align="center"><img src="./src/assets/img/logo.svg" width="200px"/></p>

<h1 align="center">Kolveniershof webapplication</h1>

> ### [`https://kolv02-hogent.web.app`](https://kolv02-hogent.web.app)

The 'Kolveniershof' webapplication is an application made to guide mentally disabled people through their weekly planning at the day care institution ([Ave Regina](https://www.averegina.be/vz---dagondersteuning.html)).

Users can log in anywhere to view their schedule and possibly provide comments.
In the day care institution itself, supervisors can request the planning of each client and go over it with the client.

Here, the supervisors can create new schedules for upcoming weeks. The webapplication contains a fully functional administration panel.

This project is part of the [Project III: Mobile apps](https://bamaflexweb.hogent.be/BMFUIDetailxOLOD.aspx?a=110488&b=1&c=1) course for the Bachelor of Applied Informatics at the Ghent University College [HoGent](https://www.hogent.be/en/) (Academic year 2019-2020).

## Screenshots

<p align="center">
    <img src="./screenshots/schedule_user.png?raw=true" width="256px">
    <img src="./screenshots/schedule_admin.png?raw=true" width="256px">
    <img src="./screenshots/schedule_admin_empty.png?raw=true" width="256px">
    <img src="./screenshots/activities.png?raw=true" width="256px">
    <img src="./screenshots/activities_edit.png?raw=true" width="256px">
    <img src="./screenshots/busses_new.png?raw=true" width="256px">
    <img src="./screenshots/activityunit_edit.png?raw=true" width="256px">
    <img src="./screenshots/busunit_new.png?raw=true" width="256px">
    <img src="./screenshots/lunchunit_delete.png?raw=true" width="256px">
    <img src="./screenshots/notes_edit.png?raw=true" width="256px">
    <img src="./screenshots/comment_view.png?raw=true" width="256px">
    <img src="./screenshots/busschedule.png?raw=true" width="256px">
    <img src="./screenshots/templates_edit.png?raw=true" width="256px">
    <img src="./screenshots/template.png?raw=true" width="256px">
    <img src="./screenshots/users.png?raw=true" width="256px">
    <img src="./screenshots/users_invite.png?raw=true" width="256px">
    <img src="./screenshots/register.png?raw=true" width="256px">
    <img src="./screenshots/login.png?raw=true" width="256px">
    <img src="./screenshots/nav.png?raw=true" width="256px">
    <img src="./screenshots/user_edit.png?raw=true" width="256px">
</p>

---

## Getting Started

The webapplication is currently hosted by [Firebase](https://firebase.google.com/) [![Website](https://img.shields.io/website?logo=firebase&url=https%3A%2F%2Fkolv02-hogent.web.app)](https://kolv02-hogent.web.app).

[**Visit the website**](https://kolv02-frontend.herokuapp.com/)

### Installation

1. Clone this repo

   ```bash
   git clone https://github.com/HoGent-Projecten3/projecten3-1920-angular-kolv02
   ```

2. Open the project root directory

   ```bash
   cd projecten3-1920-angular-kolv02
   ```

3. Install dependencies from npm

   ```bash
   npm install
   ```

4. Run the project

   ```bash
   npm start
   ```

   Your browser should now open `localhost:4200`

> Copy paste this in your terminal if you're lazy. 😴
>
> ```bash
> git clone https://github.com/HoGent-Projecten3/projecten3-1920-angular-kolv02 && cd projecten3-1920-angular-kolv02 && npm i && npm start
> ```

#### Dummy login

Use the login credentials stated below to test the project's functionality.

Client:

- Email: *`client@mail.com`*
- Password: *`test00##`*

Supervisor:

- Email: *`mentor@mail.com`*
- Password: *`test00##`*

### Building the project

1. Open terminal in the root folder
2. Install dependencies from npm with `npm install` when needed
3. Run `npm build`

### Running tests

1. Open terminal in the root folder
2. Install dependencies from npm with `npm install` when needed
3. Run `npm test` (for unit tests) or `npm run e2e` for end-to-end tests

You can also run a linter with `npm run lint`.

### REST backend

This application relies on a REST backend server.

1. Open the `environment.ts` and/or `environment.prod.ts` files located at `src/environments`.
2. Change the value for `API_URL` to your own link.
3. Create a new Firebase project and change the values accordingly.

The sourcecode for this server is located [here](https://github.com/HoGent-Projecten3/projecten3-1920-backend-kolv02). The server is hosted by [Heroku](https://www.heroku.com/) [![Website](https://img.shields.io/website?label=backend&logo=heroku&url=https%3A%2F%2Fkolv02-backend.herokuapp.com%2Fdocs)](https://kolv02-backend.herokuapp.com).

## Built With

- [Angular Material](https://material.angular.io/)
- [Hamburgers](https://jonsuh.com/hamburgers/)
- [ReactiveX](http://reactivex.io/)
- [Firebase](https://firebase.google.com/)
- [zxcvbn](https://github.com/dropbox/zxcvbn)

## Team

| <a href="https://github.com/JakobLierman" target="_blank">**Jakob Lierman**</a> | <a href="https://github.com/RubenDeFreyne" target="_blank">**Ruben De Freyne**</a>  | <a href="https://github.com/VictorOwnt" target="_blank">**Victor Van Hulle**</a> | <a href="https://github.com/reeveng" target="_blank">**Reeven Govaert**</a> | <a href="https://github.com/SWeB06" target="_blank">**Sebastien Wojtyla**</a> |<a href="https://github.com/WoutMaes" target="_blank">**Wout Maes**</a> |
| --- | --- | --- | --- | --- | --- |
| [![Jakob](https://avatars2.githubusercontent.com/u/25779630?s=200)](https://github.com/JakobLierman) | [![Ruben](https://avatars2.githubusercontent.com/u/25815999?s=200)](https://github.com/RubenDeFreyne) | [![Victor](https://avatars2.githubusercontent.com/u/17174095?s=200)](https://github.com/VictorOwnt) | [![Reeven](https://avatars3.githubusercontent.com/u/36441093?s=200)](https://github.com/reeveng)| [![Sebastien](https://avatars2.githubusercontent.com/u/36441058?s=200)](https://github.com/SWeB06) | [![Wout](https://avatars0.githubusercontent.com/u/36442271?s=200)](https://github.com/WoutMaes)
