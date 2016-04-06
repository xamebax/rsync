const express = require('express')
const path = require('path')
const port = process.env.PORT || 8181
const app = express()
const environment = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack(webpackConfig)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(compiler))
}

app.use(express.static(`${__dirname}/public`))

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'dist', 'index.html'))
})

app.listen(port)
console.log(`Server started on port ${port} with ${environment} environment`)
