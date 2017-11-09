// Run firebase serve, then run a webpack-dev-server that proxies to it.
const {spawn} = require('child_process')
    , thru = require('through2')

let resolveFirebaseUrl, hasStartedListening = false
const firebaseUrl = new Promise(r => resolveFirebaseUrl = r)

const serverListening = /^Server listening at: (.*)/

// Run `firebase serve`
const firebaseServe = spawn('firebase', ['serve'])

// Scan through its output...
firebaseServe.stdout
  // We're looking for the line where firebase serve tells us
  // what URL it's accessible at (usually localhost:5000, but it
  // may have to pick another port). 
  .pipe(thru(function(line, enc, cb) {   
    // To avoid confusion, we don't pass through stdout until 
    // after the "listening" line has passed.
    cb(null, hasStartedListening ? line : null)

    // Is this the `Server listening` line?
    const match = line.toString().match(serverListening)

    // If so, resolve the firebase url promise with the url,
    // and start passing through lines.
    if (match) {
      resolveFirebaseUrl(match[1].trim())
      hasStartedListening = true
    }
  }))
  .pipe(process.stdout)

// Pipe stderr from firebase serve to our stderr.
firebaseServe.stderr.pipe(process.stderr)

// Once `firebase serve` has started, launch webpack-dev-server
// with the appropriate environment variables set.
firebaseUrl
  .then(FIREBASE_SERVE_URL => {
    const devServer = spawn('npx', ['webpack-dev-server', ...process.argv.slice(2)], {
      env: Object.assign({
        NODE_ENV: 'development',
        FORCE_COLOR: 3,
        FIREBASE_SERVE_URL
      }, process.env)
    })

    devServer.stdout.pipe(process.stdout)
    devServer.stderr.pipe(process.stderr)
  })