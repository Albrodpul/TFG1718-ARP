var express = require('express');
var router = express.Router();
var request = require('request');

module.exports = router;

var pathAlbrodpul = '/api/v1/oil';
var apiServerHostAlbrodpul = 'http://sos-2016-01.herokuapp.com';
router.use("/", function(req,res){
  var url = apiServerHostAlbrodpul + pathAlbrodpul + req.url;
  console.log("Piped: "+ req.baseUrl + req.url);
  console.log("URL Accesed: "+ url);

  req.pipe(request(url,(error,response,body)=>{
    if(error){
      console.error(error);
      res.sendStatus(503);
    }
  })).pipe(res);
});
