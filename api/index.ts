import axios from 'axios'
import express from 'express'
import pkg from '../package.json'

const app = express()

const surge = 'https://surge.surge.sh'

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({ name: pkg.name, version: pkg.version })
})

app.get('/api/token', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const res2 = await axios.post(`${surge}/token`, {}, {
      headers: { Authorization: req.headers['authorization'] }
    })
    res.send(res2.data)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { code, message } = err
      const { status, statusText } = err.response ?? {}
      console.error(`${code}: ${status} ${statusText} - ${message}`)
      res.send({ code, status, statusText, message })
    }
  }
})

app.get('/api/list', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const res2 = await axios.get(`${surge}/list`, {
      headers: { Authorization: req.headers['authorization'] }
    })
    res.send(res2.data)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const { code, message } = err
      const { status, statusText } = err.response ?? {}
      console.error(`${code}: ${status} ${statusText} - ${message}`)
      res.send({ code, status, statusText, message })
    }
  }
})

export default app
