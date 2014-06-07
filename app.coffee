express = require('express')
http = require('http')
path = require('path')
hamlc = require 'haml-coffee'
fs = require 'fs'

app = express()

compile = (str, path) ->
  stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())


app.configure ->
  app.set('port', process.env.PORT || 3000)
  app.use(express.bodyParser())
  app.use(express.static(path.join(__dirname, 'public')))

app.configure 'development', ->
  app.use(express.errorHandler())

app.get '/', (req, res) ->
  fs.readFile './views/index.hamlc', (err, data) ->
    tmpl = hamlc.compile(data.toString())
    res.send(tmpl())


http.createServer(app).listen app.get('port'), ->
  console.log("Express server listening on port " + app.get('port'))

