const express = require('express')
const router = express.Router()

const db = require('./../../database/mongodb')

router.get('/', async (req, res) => {
    const cars = await db.getCars()

    res.send(cars)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    const car = await db.getCarById(id)

    res.send(car)
})

router.post('/', async (req, res) => {
    const newCar = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year
    }

    await db.insertCar(newCar)

    res.sendStatus(201)
})

router.put('/:id', async (req, res) => {
    const updatedCar = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year
    }

    const id = req.params.id

    await db.updateCarById(id, updatedCar)

    res.sendStatus(200)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    await db.deleteCarById(id)

    res.sendStatus(200)
})

module.exports = router