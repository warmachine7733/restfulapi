const Car = require("../models/car");
const User = require("../models/user");

module.exports = {
  index: async (req, res, next) => {
    const result = await Car.find({});
    res.status(200).json(result);
  },
  //VALIDATION:DONE
  newCar: async (req, res, nex) => {
    try {
      //1.find the seller
      const seller = await User.findById(req.value.body.seller);

      //2.create and save the car
      const newCar = new Car(req.body);
      //console.log(newCar);
      await newCar.save();

      //3.seller save
      seller.cars.push(newCar);
      await seller.save();
      res.status(200).json(seller);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getCar: async (req, res, next) => {
    try {
      const result = await Car.findById(req.value.params.carId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  replaceCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;
      const newCar = req.value.body;
      const result = await Car.findOneAndUpdate(carId, newCar);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  updateCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;
      const updateCar = req.value.body;
      const result = await Car.findOneAndUpdate(carId, updateCar);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params;
      const car = await Car.findById(carId);
      if(car==null)
      return res.status(404).json('car doesn\'t exists')
      const seller = await User.findById(car.seller);

      //removing car from car collection
      await Car.deleteOne(car);
      //removing car from seller's car's array
      seller.cars.pull(car);
      await seller.save();
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
