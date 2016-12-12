var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

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
          ordersList[i]["state"] = req.body["state"];
          break;
        }
      }
        fs.writeFile( __dirname + "/" + "sample-order-dump.json", JSON.stringify(ordersList) , function (err, data) {
   });
    
    res.end(JSON.stringify(ordersList[i]));
    });  
});

app.get('/orders/', function (req, res) {
   fs.readFile( __dirname + "/" + "sample-order-dump.json", 'utf8', function (err, data) {
       console.log(__dirname);
       page = req.query.pageNo
       ordersList = JSON.parse( data );
       j = 0;
       offset = 10;
       console.log(page);
       pageData = "[";
       for (i = offset*page, len = i+offset; i < len && i < ordersList.length ; i++ , j++) {
          pageData = pageData +  JSON.stringify(ordersList[i]) + ',';
        }
        // get rid of extra coma at the ends
        pageData = pageData.substr(0, pageData.length - 1)
        pageData = pageData + ']';
        console.log(pageData);
       res.end( pageData ); 
   });
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("app listening at http://%s:%s", host, port);

});
