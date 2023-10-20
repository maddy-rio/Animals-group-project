import express from 'express'
import { log } from 'node:console'
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

// add a comment
animalRoute.post('/comment/:id', async (req, res) => {
  const num = Number(req.params.id)

  // write to the json object
  const animal = data.animals.find((animal) => animal.id === num)
  animal.comments.push(req.body.comment)
  const newCommentData = JSON.stringify(data)

  await fs.writeFile('server/data/data.json', newCommentData)
  res.redirect(`/animals/${req.params.id}`)
})

export default animalRoute
