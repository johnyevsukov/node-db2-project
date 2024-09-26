const express = require('express')
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
    } = require('./cars-middleware')


const router = express.Router()


router.get('/', (req, res, next) => {
    Car.getAll()
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch(next)
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.car)
})

router.post('/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    (req, res, next) => {
        Car.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status((err.status || 500).json({
        custom: 'something went wrong in the api',
        message: err.message,
        stack: err.stack
    }))
})


module.exports = router
