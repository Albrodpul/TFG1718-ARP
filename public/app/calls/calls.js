var path = require('path');

module.exports.getCallback = function(req, res) {
  res.sendFile(path.join(__dirname + "/../../index.html"));
};

module.exports.getProfile = function(req, res) {
  res.sendFile(path.join(__dirname + "/../../index.html"));
};

