import express from 'express'
import fs from 'node:fs/promises'

const animalRoute = express.Router()

// Data
const data = await fs
  .readFile('server/data/data.json', 'utf-8')
  .then((data) => JSON.parse(data))

// ROUTES
// All animals
animalRoute.get('/', async (req, res) => {
  try {
    res.render('all-animals', data)
  } catch (err) {
    console.log(err.message)
  }
})

export default animalRoute
