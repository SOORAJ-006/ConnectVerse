# ConnectVerse

It is a simple project made for an interview machine test

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
your should install the latest version on node.js and the project is running in vite.js
```

create a .env file in the server folder
```
cd Server
```
add add 
PORT = 3001 // please provide the same port number
CONNECTION_STRING = //your mongodb string here
SECRET_TOKEN = //your token here
NODE_ENV= production
EMAIL_USERNAME= //your email to sent the reset password link
EMAIL_PASSWORD= //your email password/app key here

### Installing

A step by step series of examples that tell you how to get a development env running

you should install the node_modules for the server

```
cd Server
npm install
```
To start the server // it is runner on nodemone
```
npm run dev
```

Then install the node_modules for front end // open a new terminal

```
cd frontend
npm install
```

To start the frontend serverl //vitejs uses port 5173

```
npm run dev
```

## Built With

* [vite.js](https://vitejs.dev/guide/) - The web framework used
* [npm](https://www.npmjs.com/) - Package Manger
* [Node.js](https://nodejs.org/docs/latest/api/) - Server framework
* [Tailwincss](https://tailwindcss.com/docs/installation) - CSS framework
* [Nodemailer](https://nodemailer.com/) - Used for mail services
* [jwt](https://jwt.io/) - For creating tokens

## Authors

* **Sooraj Lal M** - *Initial work* - [SOORAJ-006](https://github.com/SOORAJ-006)
