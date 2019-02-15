var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "myuser",
  password: "secret",
  database: "backup"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res, next) {
  con.query("insert into messages(user,message) values('"+req.body.user+"','"+req.body.message+"');", function(err, result) {
    if(err) throw err;
  });

  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.get('/back/:limit', function (req, res, next) {
  con.query("select * from messages limit "+req.params.limit+";", function(err, result) {
    if(err) throw err;
    console.log(result.length);
    var to_return = new Object();
    for(var i =0; i < result.length; i++){
      to_return[i] = {"mesage": result[i].message, "user": result[i].user};
    }
    res.end(JSON.stringify(to_return));
  })
});

module.exports = router;