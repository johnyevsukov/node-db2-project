const Car = require('./cars-model')
const vinValidator = require('vin-validator')


const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
  .then(car => {
    if(!car) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    }
    else {
      req.car = car
      next()
    }
  })
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body

  if(vin == undefined) {
    res.status(400).json({ message: 'vin is missing' })
  }
  else if(make == undefined) {
    res.status(400).json({ message: 'make is missing' })
  }
  else if(model == undefined) {
    res.status(400).json({ message: 'model is missing' })
  }
  else if(mileage == undefined) {
    res.status(400).json({ message: 'mileage is missing' })
  }
  else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if(vinValidator.validate(req.body.vin)){
    next()
  }
  else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Car.getByVin(req.body.vin)
  .then(car => {
    if(car) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    }
    else {
      next()
    }
  })
}

module.exports = {
  checkCarId,
  checkVinNumberValid,
  checkCarPayload,
  checkVinNumberUnique
}
