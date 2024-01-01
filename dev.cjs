const { default: app } = require('./dist')

const port = 3000

app.listen(port, () => {
  console.log(`Dev server: http://localhost:${port}/api`)
})
