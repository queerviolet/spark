'use strict'

const functions = require('firebase-functions')
    , lib = require('./lib')

exports.helloWorld = functions.https.onRequest((request, response) =>
   response.send(lib))