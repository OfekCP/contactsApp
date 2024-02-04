const express=require("express")
const app=express()
const contactRoutes=require("./Routes/contactRoutes")
var cors=require("cors")
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hi")
})
app.use("/contacts",contactRoutes)
module.exports=app