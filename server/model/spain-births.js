var mongoose = require('mongoose');
var SpainBirths = new mongoose.Schema({
    region: { type: String },
    year: Number,
    men: Number,
    women: Number,
    totalbirth: Number
});

mongoose.model('spain-births', SpainBirths);
