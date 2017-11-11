var mongoose = require('mongoose');
var SpainBirths = new mongoose.Schema({
    region: { type: String },
    year: Number,
    men: Number,
    women: Number,
    totalbirth: Number
});

mongoose.model('spain-births', SpainBirths);
mongoose.connect('mongodb://test:test@ds159344.mlab.com:59344/tfg1718-arp');

console.log('Mongoose and MongoDB are connected');