# Interview Scheduler
The Interview Scheduler is a single page application (SPA) created with React which allows students to book interview appointments throughout the week. Operations include the ability to show, book, edit and delete appointments from a PostgreSQL database hosted by an API server.

## Tech Stack and Tools
| Front-End  | Back-End | Database | Testing | Deployment |
| ------------- | ------------- | ------ | ---------- | --------- |
| **React** with **Axios** for HTTP requests | **Express.js** for server  | **PostgreSQL** | **Storybook** for component testing | **Heroku** for API server (coming soon)|
| **HTML** |  | | **Jest** for unit + integration tests | **Netifly** (coming soon) |
| **CSS** with **SASS** as preprocessor | | | **Cypress** for E2E tests |

## Demo

Menu Navigation
!["Menu Navigation"](https://github.com/xihai01/scheduler/blob/master/docs/day-list.gif?raw=true)

Booking a new appointment
!["Book appointment"](https://github.com/xihai01/scheduler/blob/master/docs/form-create.gif?raw=true)

Delete an existing appointment
!["Delete Appointment"](https://github.com/xihai01/scheduler/blob/master/docs/form-delete.gif?raw=true)

Edit an exisiting appointment
!["Edit Appointment"](https://github.com/xihai01/scheduler/blob/master/docs/form-edit.gif?raw=true)

Error communicating with server
!["Server Error"](https://github.com/xihai01/scheduler/blob/master/docs/form-error.gif?raw=true)

## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress

```sh
npm run cypress
```
