Can't start a fire without a spark.

# Get started:

```
git clone git@github.com:queerviolet/spark.git
cd spark
npm install
npx firebase init
npm start
```

# Frontend

The frontend starts in [`main.js`](./main.js). The root of the react app
is in [`App.jsx`](./App.jsx).

# Functions

Write your [Cloud Functions](https://firebase.google.com/docs/functions/) in
[`functions/index.js`](./functions/index.js).

You can require node modules from Cloud Functions normally. Be sure to `npm install` them
*inside* the functions directory (it has its own `package.json`).

Sadly, you can't use `import` statements, and you can't `require` code that does.
Don't despair, the library provides a workaround.

## The Library

The library is defined in [`lib/index.js`](lib/index.js). In the library, you
can `import` code from your project normally, and anything you `export` will be
available to your Cloud Functions.

It is a bridge between Cloud Function code and the rest of your
project's code.