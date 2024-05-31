const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const { request, response } = require('express')

const app = express()
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://admin:rocky9886@cluster0.nczlwja.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
client.connect()

//Experiment 6-1
var db = client.db("ex6")
var col = db.collection("costumer")


app.get('/',(request,response) => {
	response.send('This is a Server')
})

app.post('/insert_book', (request,response) => {
	col = db.collection("costumer")
	console.log(request.body)
	col.insertOne(request.body)
	response.send(request.body)
})

app.get('/show_one_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.findOne()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})

app.get('/show_all_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find().toArray()
			console.log(result)
			if(result == null)
			{
				console.log("sever");
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})

app.get('/show_all_lte5_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find({book_id:{$lte:5}}).toArray()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})


app.get('/show_all_gte2_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find({book_id:{$gte:2}}).toArray()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})

app.get('/show_all_gt3_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find({book_id:{$gt:3}}).toArray()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})

app.get('/show_all_lte2_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find({book_id:{$lte:2}}).toArray()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})


app.get('/show_all_lt5_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find({book_id:{$lt:5}}).toArray()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})

app.get('/show_all_gt3_or_bookprice_equalto10_book', (req, res)=>{
	col = db.collection("costumer")
	console.log(req.query)
	async function find(){
		try{
			const result=await col.find({$or:[{book_price:"10"},{book_id:{$gt:3}}]}).toArray()
			console.log(result)
			if(result == null)
			{
				res.send({"Data_Retrieval":"Fail"})
			}
			else{
				res.send(result)
			}
		}
		finally{}	
	}
	find().catch(console.dir)	
})

app.patch('/show_all_update',(req, res)=>{
	console.log("update")
	col = db.collection("costumer")
	console.log(req.body)
	const doc = {
		$set: {book_price:"100"}
	}
	col.updateOne({book_id:7},doc)
	res.send("Updated Successfully")

	// console.log(req.query)
	// async function find(){
	// 	try{
	// 		const result=await col.find().toArray()
	// 		console.log(result)
	// 		if(result == null)
	// 		{
	// 			console.log("sever");
	// 			res.send({"Data_Retrieval":"Fail"})
	// 		}
	// 		else{
	// 			res.send(result)
	// 		}
	// 	}
	// 	finally{}	
	// }
	// find().catch(console.dir)	
})


app.listen(8086)
console.log("server started")

// //Experiment 6-3
// var db1 = client.db("ex63")
// var col1 = db.collection("department")

// app.post('/insert_detail', (request,response) => {
// 	col1 = db1.collection("department")
// 	console.log(request.body)
// 	col.insertOne(request.body)
// 	response.send(request.body)
// })

// app.get('/show_one_detail', (req, res)=>{
// 	col1 = db1.collection("department")
// 	console.log("hi");
// 	console.log(req.query)
// 	async function find(){
// 		try{
// 			const result=await col.findOne()
// 			console.log(result)
// 			if(result == null)
// 			{
// 				res.send({"Data_Retrieval":"Fail"})
// 			}
// 			else{
// 				res.send(result)
// 			}
// 		}
// 		finally{}	
// 	}
// 	find().catch(console.dir)	
// })

// app.get('/show_all_detail', (req, res)=>{
// 	col1 = db1.collection("department")
// 	console.log(req.query)
// 	async function find(){
// 		try{
// 			const result=await col.find().toArray()
// 			console.log(result)
// 			if(result == null)
// 			{
// 				console.log("sever");
// 				res.send({"Data_Retrieval":"Fail"})
// 			}
// 			else{
// 				res.send(result)
// 			}
// 		}
// 		finally{}	
// 	}
// 	find().catch(console.dir)	
// })


// app.patch('/update_stu',(req, res)=>{
// 	col = db.collection("stu_data")
// 	console.log(req.body)
// 	const doc = {
// 		$set: {dept:"BT",address:"Add 10"}
// 	}
// 	col.updateOne({id:5},doc)
// 	res.send("Updated Successfully")
// })

// app.get('/show_all_gt1', (req, res)=>{
// 	col = db.collection("stu_data")
// 	console.log(req.query)
// 	async function find(){
// 		try{
// 			const result=await col.find({id:{$gte:1},$or:[{dept:"CSE"},{dept:"ECE"}]}).toArray()
// 			console.log(result)
// 			if(result == null)
// 			{
// 				res.send({"Data_Retrieval":"Fail"})
// 			}
// 			else{
// 				res.send(result)
// 			}
// 		}
// 		finally{}	
// 	}
// 	find().catch(console.dir)	
// })

// app.get('/show_id_dept', (req, res)=>{
// 	col = db.collection("stu_data")
// 	console.log(req.query)
// 	async function find(){
// 		try{
// 			const result=await col.find().toArray()
// 			console.log(result)
// 			if(result == null)
// 			{
// 				res.send({"Data_Retrieval":"Fail"})
// 			}
// 			else{
// 				res.send(result)
// 			}
// 		}
// 		finally{}	
// 	}
// 	find().catch(console.dir)	
// })

// app.get('/show_exclude_dept', (req, res)=>{
// 	col = db.collection("stu_data")
// 	console.log(req.query)
// 	async function find(){
// 		try{
// 			const result=await col.find().toArray()
// 			console.log(result)
// 			if(result == null)
// 			{
// 				res.send({"Data_Retrieval":"Fail"})
// 			}
// 			else{
// 				res.send(result)
// 			}
// 		}
// 		finally{}	
// 	}
// 	find().catch(console.dir)	
// })

// app.get('/show_ace', (req, res)=>{
//     // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/
// 	col = db.collection("stu_data")
// 	console.log(req.query)
// 	async function find(){
// 		try{
//             col.aggregate([{$sort: {name:1}}])
// 			const result=await col.find().toArray()
// 			console.log(result)
// 			if(result == null)
// 			{
// 				res.send({"Data_Retrieval":"Fail"})
// 			}
// 			else{
// 				res.send(result)
// 			}
// 		}
// 		finally{}	
// 	}
// 	find().catch(console.dir)	
// })