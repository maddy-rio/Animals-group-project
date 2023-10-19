import * as Path from 'node:path'
import express from 'express'
import hbs from 'express-handlebars'
import animalRoute from './routes'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Setting router
server.get('/', (req, res) => {
  res.redirect('/animals')
})

server.use('/animals', animalRoute)

export default server
