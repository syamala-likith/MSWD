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
const db = client.db("s1")
const col = db.collection("c207")

app.listen(8081) //It means localhost:8081

console.log("Server Started")

function fun(a,b)
{
    return a+b;
}

var variable = (a,b) => a+b //[---(a,b) => a+b---] is a function in a compressed way that was assigned to a variable
// And this funtion is in (*** arrow function of ES6 ***)

var variable1 = (a,b) => { // this is modified from above function to write 'n' number of lines inseted of 1 line
    return a+b
} 

app.get('/',(request,response)=>{
    response.send("Output is: "+variable(1,5))
})

console.log("Welcome")
console.log("Addition of a+b is: "+fun(2,3))
console.log("In Compressed function the Addition of a+b is: "+variable(10,20))
console.log("The Compressed function with 'n' lines Addition of a+b is: "+variable(30,30))

app.post('/insert', (request,response) => {
    col.insertOne(request.body)
    console.log(request.body)
    response.send(request.body)
  })

  app.get('/check',(req,res)=>{
    console.log(req.query);
    async function find(){
        try{
            var result = await col.findOne({ email: req.query.un }) //await is for to wait until the data was get to keyword and function was used because await is asynchronised 
            if(result===null)
            {
                res.send("Fail");
            }
            else
            {
                if(result.pw===req.query.pw)
                {
                    res.send("pass");
                }
                else{
                    res.send("fail");
                }
            }
        }
        finally{}
    }
    find().catch(console.dir);
  })
//var const let can be used to declare the identifier 
//run by "node server.js" in cmd