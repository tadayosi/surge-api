import axios, { Method } from 'axios'
import express, { Request, Response } from 'express'
import pkg from '../package.json'

const surge = 'https://surge.surge.sh' as const
const commands = ['account', 'list', 'token'] as const
type Command = typeof commands[number]

const app = express()

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({
    name: pkg.name,
    version: pkg.version,
    endpoints: commands.map(cmd => `/api/${cmd}`)
  })
})

const handleRequest = (cmd: Command, method: Method = 'get') => async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  try {
    const res2 = await axios({
      method,
      url: `${surge}/${cmd}`,
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
}

app.get('/api/account', handleRequest('account'))
app.get('/api/list', handleRequest('list'))
app.get('/api/token', handleRequest('token', 'post'))

export default app
