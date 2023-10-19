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

// Single animal
animalRoute.get('/:id', (req, res) => {
  const num = Number(req.params.id)
  const animal = data.animals.find((animal) => animal.id === num)
  res.render('individual-animal', animal)
})
export default animalRoute
