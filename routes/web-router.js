require('dotenv').config()
const express = require('express')
const db = require('../database/mongodb')

const app = express()
const router = express.Router()

router.get('/', async (req, res) => {
    const cars = await db.getCars()

    res.render("home", {
        cars
    })
})

router.post('/new-car', async (req, res) => {
    const newCar = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year
    }
    
    await db.insertCar(newCar)
    
    res.redirect("/")
})


router.get("/cars/:id", async (req, res) => {
    const id = req.params.id
    const car = await db.getCarById(id)

    
    res.render('edit-car', {
        car
    })
})
router.post("/edit-car/:id", async (req, res) => {
    
    const id = req.params.id
    const updatedCar = {
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        year: req.body.year
    }
    
    await db.updateCarById(id, updatedCar)
    
    res.redirect('/')
})

router.post("/delete-car/:id", async (req, res) => {
    const id = req.params.id
    
    await db.deleteCarById(id)
    
    res.redirect('/')
})

module.exports = router
