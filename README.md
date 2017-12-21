## Nure API

This project was created for Kharkiv National University of Radioelectronics aka NURE.
The purpose of this project is to add possibility for students to view their timetable if University fails.

## Configure your app

This project requires running MongoDB.
As default MongoDB address is set to `mongodb://localhost` and port `27017`.
But you can change it in `/server/config/config.js`.

## Available Scripts

### `npm start`

>Note: before running this script you should install node modules
>You should do it using script `npm install` in project directory and in server directory

In the server directory:

Runs the server in the development mode.<br>
It will be avaliable at [http://localhost:3001/api](http://localhost:3001/api)

>Note: If you set up all right terminal will show you at least two messages
>`nureApi listening at port`
>`Connected to DB`

In the project directory:

>Note: Server should be runned before viewing app in browser

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

>Note: `npm run build` is not avaliable for server directory.

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
