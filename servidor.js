const express=require("express");
const app = express();
const port = 8080;

const {checkMethod}=require("./src/middlewares-general");
app.use(checkMethod);
app.use(express.json());

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