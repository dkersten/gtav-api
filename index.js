const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'GTA V API' })
})

app.get('/vehicles', db.getVehicles)
app.get('/vehicles/:id', db.getVehicleById)
app.post('/vehicles', db.createVehicle)
app.delete('/vehicles/:id', db.deleteVehicle)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})