/**
 * Run `firebase serve` and `webpack-dev-server` together, to get
 * firebase routes and function emulation alongside webpack-dev-server's
 * hot loading.
 */

const debug = require('debug')('dev')
    , {spawn} = require('child_process')
    , thru = require('through2')


let resolveFirebaseUrl, hasStartedListening = false
const firebaseUrl = new Promise(r => resolveFirebaseUrl = r)

// `firebase serve` prints a line that looks like this
// when it starts listening:
const localServerRe = /(?:Local server|Server listening): (.*)/

// Build functions
spawn('npm', ['run', 'watch-lib'], {stdio: 'inherit'})

// Run `firebase serve`
const firebaseServe = spawn('npx', ['firebase', 'serve', '--only', 'functions,hosting'])

// Scan through its output...
firebaseServe.stdout
  // We're looking for the line where firebase serve tells us
  // what URL it's accessible at (usually localhost:5000, but it
  // may have to pick another port). 
  .pipe(thru(function (line, enc, cb) {
    // To avoid confusion, we don't pass through stdout until 
    // after the "listening" line has passed.
    cb(null, hasStartedListening ? line : debug('%s', line))

    // Is this the line telling us where the local server is?
    const match = line.toString().match(localServerRe)

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