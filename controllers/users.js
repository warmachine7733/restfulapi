const User = require("../models/user");
const Car = require("../models/car");

const Joi = require("joi");

//promise
module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  //VALIDATION:DONE
  newUser: async (req, res, next) => {
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },

  //VALIDATION:DONE
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findById(userId);
      // if (user == null) throw "user not exists";
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  //VALIDATION:DONE
  replaceUser: async (req, res, next) => {
    //enforce that req.body must contain all the fields
    const { userId } = req.value.params;
    const newUser = req.value.body;
    const result = await User.findOneAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  //VALIDATION:DONE
  updateUser: async (req, res, next) => {
    //enforce that req,body contain any number of fields
    const { userId } = req.params;
    const newUser = req.body;
    const result = await User.findOneAndUpdate(userId, newUser);
    res.status(200).json({ success: true });
  },

  //VALIDATION:PENDING
  getUserCar: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      const user = await User.findById(userId).populate("cars");
      //console.log(user);
      res.status(200).json(user.cars);
    } catch (error) {
      console.log(error);
    }
  },

  newUserCar: async (req, res, next) => {
    try {
      const { userId } = req.value.params;
      //create a new car
      const newCar = new Car(req.value.body);
      //Get user
      //console.log(newCar);
      const user = await User.findById(userId);
      // //Assign the user as seller
      newCar.seller = user;
      // //Save the car;

      await newCar.save();
      //console.log("user.car", user.cars);
      user.cars.push(newCar);

      await user.save();

      res.status(200).json(newCar);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};
