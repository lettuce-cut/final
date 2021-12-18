const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

//
// Tickets
//

const User = users.model;
const validUser = users.valid;

// This is the schema for a ticket
const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  name: String,
  momName: String,
  dadName: String,
  created: {
    type: Date,
    default: Date.now
  },
});

//   const User = users.model;

  // The model for a ticket
const Photo = mongoose.model('Photo', photoSchema);

// get tickets -- will list tickets that a user has submitted
  // get all photos
  router.get("/", async (req, res) => {
    try {
      let photos = await Photo.find().sort({
        created: -1
      }).populate('user');
      return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/mom", async (req, res) => {
    try {
      console.log("AHHE")
      // console.log(req)
      const photo = await Photo.findOne({
        name: "Mannie"
      });
      return res.send(photo);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // // create a ticket
  router.post("/", validUser, upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
    console.log(req.file.filename)
    const photo = new Photo({
      user: req.user,
      path: "/images/" + req.file.filename,
      name: req.body.name,
      momName: req.body.momName,
      dadName: req.body.dadName,
    });
    try {
      await photo.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await Photo.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  module.exports = {
    model: Photo,
    routes: router,
  }