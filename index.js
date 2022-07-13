const express = require("express")
const mongoose = require("mongoose");
const app = express()
mongoose.connect('mongodb://root:dev123RFT@ec2-54-236-23-212.compute-1.amazonaws.com:27017,ec2-52-91-52-119.compute-1.amazonaws.com:27017,ec2-3-235-195-235.compute-1.amazonaws.com:27017/masido?ssl=false&replicaSet=rs&authSource=admin',
  {
    useNewUrlParser: true
  }
)
mongoose.connection.on("connected", () => {
    console.log("successfully connected to db instance")
})

app.use(express.json({ limit: "10mb" }))

const routes = require("./routes")



app.get("/",(req,res)=>{
    res.json({error:false})
})
app.use("/migration",routes)

app.listen(4000,()=>{
    console.log("litening on 4000")

})