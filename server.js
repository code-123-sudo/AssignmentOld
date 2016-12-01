var express = require('express');
var app = express();
var fs = require("fs");

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
    res.end(JSON.stringify(data2[i]));      
   });
})

app.get('/orders/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "sample-order-dump.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.delete('/deleteOrder', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "sample-order-dump.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
