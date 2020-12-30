const express = require("express");
const app = express();
const bodyParser = require ("body-parser")
const cors = require("cors");
var mongodb = require('mongodb');
const port = 3000;
const url ="mongodb+srv://training:WUJMyPMB7rW9OP5F@guvi.k00x5.mongodb.net/Money-Manager?retryWrites=true&w=majority";
console.log(url);
app.use(bodyParser.json());  
app.use(cors());

app.get("/transactions",async (req,res) => {
    try {
        let client = await mongodb.connect(url,{ useUnifiedTopology: true });
        let db = client.db("database")
        let data = await db.collection("money-manager-app").find().toArray();
        client.close();
        res.json(data);
        
    }catch(error) {
        res.status(500).json({
           message: "Something went wrong!",
        })
    }
})

app.post("/transaction", async (req,res) => {
    try{
        let client = await mongodb.connect(url,{ useUnifiedTopology: true });
        let db = await client.db("database")
        let data=await db.collection("money-manager-app").insertOne(req.body);
        client.close()    
        console.log(req.body)     
        res.json({
            message:"success",
        })
    }
    catch (error){
        console.log(error)
    }
})

app.delete("/transactionss", async (req,res) => {
    try{
        let client = await mongodb.connect(url,{ useUnifiedTopology: true });
        let db = await client.db("database")
        let data=await db.collection("money-manager-app").deleteOne(req.body);
        client.close()
           console.log("delete sucess")
        res.json({
            message:"success",
        })
    

    }
    catch (error){
        console.log(error)
    }
})

app.listen(port, () => console.log(`Running on port : ${port}`));