Can't start a fire without a spark.

# Get started:

```
git clone git@github.com:queerviolet/spark.git
cd spark
npm install
npm start
```

# Frontend

The frontend starts in [`main.js`](./main.js). The root of the react app
is in [`App.jsx`](./App.jsx).

# a word about ~

The webpack config aliases `~` to mean "the root of the app". For example,
you can `import firebase from '~/fire'` anywhere in your app, without
worrying about how many `..`s to have in your relative path.

# Firebase

Firebase is setup in [`fire/index.js`](./fire/index.js). Your config will
get written to [`fire/setup.js`](./fire/setup.js) after you run `npm install`.

You can import the various Firebase APIs from `~/fire`. For instance:

```js
  import firebase, {auth} from '~/fire'

  const google = firebase.auth.GoogleAuthProvider
  auth.signInWithPopup(google)
```

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

# Hot loading

Hot module replacement is enabled, and the react-hot-loader plugins are applied.

Your React components will update in place after you save them, without losing
their state.