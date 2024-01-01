import express from 'express'
import pkg from '../package.json'

const app = express()

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({ name: pkg.name, version: pkg.version })
})

app.get('/api/token', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({ message: `Hello` })
})

app.get('/api/list', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({ message: `Hello` })
})

export default app
