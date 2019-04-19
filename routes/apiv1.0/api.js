var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var USER = require("../../database/modelUser");
/* GET home page. */
router.post('/user', function(req, res, next) {
    var params = req.body;
    var data = req.body;
    var userdata = {
        name: data.name,
        lastname: data.lastname,
        password: sha1(params.password),
        registerDate: new Date(),
        email: data.email
    };
    var user = new USER(userdata);
    user.save().then((docs) => {
        if(docs) {
            res.status(200).json({
                msn: "usuario insertado con exito"
            });
        }else{
            res.status(500).json({
                msn: "error al conectarse a la base de datos"
            })
        }
        return;
    });
});

router.get('/user', (req, res, next) => {
    USER.find({}).exec((err, docs) => {
        if(err) {
            res.status(500).json({
                "msn" : "paso algo con la bd"
            });
        }
        res.status(200).json(docs);
    });
});

router.put('/user/:id',(req, res, next) => {
    var data = req.body;
    console.log(req.url);
    var id_exp = /\w{10,}/g
    var id = req.url.match(id_exp)[0];
    var userdata = {
        name: data.name,
        lastname: data.lastname,
        password: data.password,
        email: data.email
    };
    USER.update({_id: id}, {$set:userdata}).exec((err, docs) => {
        res.status(500).json({
            "msn" : "actualizado ok"
        });
    });
});

router.delete('/user/:id',(req, res, next) => {
    var id_exp = /\w{10,}/g
    var id = req.url.match(id_exp)[0];
    USER.remove({_id: id}, (result) => {
        res.status(500).json({
            "msn" : "borrado"
        });
    })
});

router.patch('/user/:id',(req, res, next) => {
    var id_exp = /\w{10,}/g
    var id = req.url.match(id_exp)[0];
    var datos = req.body;
    var arr = ["name", "lastname", "password", "email"];
    var updatedata = {};
    var keys = Object.keys(datos);
    arr.map((item)=>{
        if(keys.indexOf(item) != -1){
            updatedata[item] = datos[item]
        }
    });
    console.log(updatedata);
    res.status(500).json({
        "msn" : "actualizad"
    });
});
module.exports = router;
