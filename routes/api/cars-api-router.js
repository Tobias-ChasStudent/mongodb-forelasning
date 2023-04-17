const express = require('express')
const router = express.Router()

const db = require('../../database/mongodb')

router.get('/', async (req, res) => {
    const cars = await db.getCars()

    res.send(cars)
})

module.exports = router