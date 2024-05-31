const { response } = require('express')
const express=require('express')  //It is used to print the output in the broswer insted of console
const cors=require('cors')
const { MongoClient } =require('mongodb')

const app = express()
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://admin:rocky9886@cluster0.nczlwja.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
client.connect()
const db = client.db("ex7")
const col = db.collection("student")

app.listen(3000) //It means localhost:8081

console.log("Server Started")

app.get('/',(request,response)=>{
    response.send("Hello World!");
})

app.post('/post', async(request,response) => {
	console.log(request.body)
	db.collection("student").insertOne(request.body)
	response.send({
        id:request.body.id,
        name:request.body.name,
        dept:request.body.dept
    });

})

app.get('/fetch', (req, res)=>{
	var col = db.collection("student")
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

app.patch('/update_stu',(req, res)=>{
	var col = db.collection("student")
	console.log(req.body)
	const doc = {
		$set: {name:"Sneha",dept:"CSE"}
	}
	col.updateOne({id:"2"},doc)
	res.send("Updated Successfully")
})

app.delete('/delete_stu',(req, res)=>{
	async function run() {
		try {
		  await client.connect();
		  const db = client.db("ex7");
		  const col = db.collection("student");
		  const doc = { id: "3" };
		  const result = await col.deleteOne(doc);
		  console.log(`documents were deleted`);
		} finally {
		}
	  }
	  run().catch(console.dir);
	  res.send("Deleted Successfully");
})