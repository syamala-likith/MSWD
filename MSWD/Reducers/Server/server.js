// const express = require('express')
// const cors = require('cors')
// const bcryptjs = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// // const { MongoClient } = require('mongodb')
// // const { request, response } = require('express')

// const app = express()
// app.use(cors()) // cros orgin resourse sharing
// app.use(express.json())

// // const uri = "mongodb+srv://admin:rocky9886@cluster0.nczlwja.mongodb.net/?retryWrites=true&w=majority"
// // const client = new MongoClient(uri)
// // client.connect()
// // var db = client.db("ex5")
// // var col = db.collection("c207")

// var key="dhiuldh";
// var algorithm=""
// app.get('/',(req,res) => {
// 	res.send("This is server page");
// })

// app.post('/login', async (req,res) => {   			//npm i bcryptjs ----> to encrypt data
// 	console.log(req.body);
// 	var pw = null;
// 	var pass_check=false;
// 	var token= null;

// 	await bcryptjs.hash("PASS 1", 5).then(response => {
// 		console.log(response);
// 		pw = response;
// 	})
// 	console.log(pw);
// 	token =await jwt.sign(req.body, key, {
// 		algorithm: algorithm,
// 		expiresIn: '2m'
// 	})
// 	bcryptjs.compare(req.body.pw, pw).then(res => {
// 		pass_check=res;
// 	})
// 	if(req.body.un == "USER 1" && pass_check == true)
// 	{
// 		res.status(200).json({
// 			message: "Sucessfull",
// 			token: token
// 		});
// 	}
// 	else{
// 		res.status(401).json({
// 			message: "Failed"
// 		});
// 	}
// })

// app.listen(8082)
// console.log("server started")

const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

var key = "dhiuldh";
var algorithm = "HS256";

app.get('/',(req, res) => {
    res.send("This is a Server Page");
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    var pw = null;
    var pass_check = false;
    var token = null;
    await bcryptjs.hash("PASS 1", 5).then(res => {
        pw = res;
    })
    console.log(pw);
    await bcryptjs.compare(req.body.pw, pw).then(res => {
        pass_check = res;
    })
    console.log(pass_check);
    token = await jwt.sign(req.body, key, {
        algorithm: algorithm,
        expiresIn: '2m'
    })
    if(req.body.un == "USER 1" && pass_check == true) {
        res.status(200).json({
            message: "success",
            token: token
        });
    }
    else {
        res.status(401).json({
            message: "fail"
        });
    }
})

app.listen(8082);
console.log("Server Started");