var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "*");
//   next();
// });





app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
})





app.use(bodyParser());


// app.get('*',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
// //  __dirname : It will resolve to your project folder.
// });

app.get('/order/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "sample-order-dump.json", 'utf8', function (err, data) {
   	    ordersList = JSON.parse( data );
   	    // console.log(data[2]);
   	    for (i = 0, len = ordersList.length; i < len; i++) {
          if ( req.params.id  == ordersList[i].orderId ) {
    		  console.log(ordersList[i]);
    	    break;
        }
		}
    res.end(JSON.stringify(ordersList[i]));

   });
});
 
app.put('/order/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "sample-order-dump.json", 'utf8', function (err, data) {
        ordersList = JSON.parse( data );
        console.log(req.body);
        for (i = 0, len = ordersList.length; i < len; i++) {
          if ( req.params.id  == ordersList[i].orderId ) {
          ordersList[i].state = req.body["state"];
          break;
        }
      }
        fs.writeFile( __dirname + "/" + "sample-order-dump.json", JSON.stringify(ordersList) , function (err, data) {
   });
    
    res.end(JSON.stringify(ordersList[i]));
    });  
});

app.get('/orders', function (req, res) {
   fs.readFile( __dirname + "/" + "sample-order-dump.json", 'utf8', function (err, data) {
       console.log(__dirname);
       res.end( data ); 
   });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

});
