const { response } = require('express')
const dbifno = require('./dbinfo')

const getVehicles = (request, response) => {
    const limit = request.query.limit
    const offset = request.query.offset
    // console.log(limit)
    // console.log(offset)

    //checks for url queries that are undefined and returns number of vehicles for pagination purposes
    if (limit === undefined && offset === undefined) {
        console.log("undefined params")
        dbifno.pool.query(`SELECT * FROM vehicles`, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(parseInt(results.rows.length))
        })
    //checks for defined URL queries and then returns the corresponding rows 
    } else {
        console.log("defined params")
        dbifno.pool.query(`SELECT * FROM vehicles limit ${limit} offset ${offset}`, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getVehicleById = (request, response) => {
    const id = parseInt(request.params.id)

    dbifno.pool.query('SELECT * FROM vehicles WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const createVehicle = (request, response) => {
    const { name, manufacturer, price, vclass, availability } = request.body

    dbifno.pool.query('INSERT INTO vehicles (name, manufacturer, price, vclass, availability) VALUES ($1, $2, $3, $4, $5)', [name, manufacturer, price, vclass, availability], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Vehicle added`)
      })
}

const deleteVehicle = (request, response) => {
    const id = parseInt(request.params.id)
  
    dbifno.pool.query('DELETE FROM vehicles WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Vehicle deleted`)
    })
  }

module.exports = {
    getVehicles,
    getVehicleById,
    createVehicle,
    deleteVehicle
}