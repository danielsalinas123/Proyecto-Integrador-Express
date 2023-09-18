const express=require("express");
const app = express();
app.use(express.json());
const port = 8080;

const listaTareas=require("./listaTareas");

const listRouter=require("./list-view-router");
app.use("/list",listRouter);

const editRouter=require("./list-edit-router");
app.use("/edit",editRouter);

app.get("/",(req,res)=>
{
    res.status(200).send(listaTareas);
    console.log(listaTareas);
});

app.listen(port,()=>{
    console.log("Server listening in localhost:"+port);
});