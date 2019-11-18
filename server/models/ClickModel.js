/**
  model for score
**/

// - REQUIRE -
const mongoose = require('mongoose');  // for creating schemas

mongoose.Promise = global.Promise;

let ClickModel = {};

// - SCHEMA -
// Define our schema
const ClickSchema = new mongoose.Schema({
  totalClicks: {  // Life time score
    type: Number,
    min: 0,
    required: true
  },
  
  currentClicks: {  // Currency more or less
    type: Number,
    min: 0,
    required: true
  },
  
  autoClickers: {  // How many auto clickers do we have
    type: Number,
    min: 0,
    required: true
  },
  
  clickRate: {  // Time between auto click
    type: Number,
    max: 1000,  // Simulate miliseconds
    required: true
  }
})