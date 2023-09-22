const express=require("express");
const app = express();
const port = 3000;

app.use(express.json());

let listaTareas=require("./src/data bases/listaTareas");
let idAvailable=[];

const {validateDescription,validateId,validateIsCompleted}=require("./src/middlewares/middlewares-RestApi");
const {validateBody}=require("./src/middlewares/middlewares-general");

app.post("/",validateBody,validateDescription,(req,res)=>
{
    const description = req.body.description;
    let id=null;

    if(idAvailable.length!=0)
    {
        id=idAvailable.splice(idAvailable.length-1,1);
        id=id[0];
    }
    else
        id=listaTareas.length+1;
    
    const newTask={id,description,isCompleted:false};
    listaTareas.push(newTask);

    res.status(201).json(newTask);
});

app.put("/",validateBody,validateId,validateDescription,validateIsCompleted,(req,res)=>
{
    const id=parseInt(req.body.id);
    const description=req.body.description;
    const isCompleted=req.body.isCompleted;

    const index=listaTareas.findIndex(item=>item.id==id);
    if(index==-1)
        return res.status(404).json({error:"The indicated id doesn't match with any register in the task list."});

    listaTareas[index].description=description;
    listaTareas[index].isCompleted=isCompleted;
    res.status(201).json(listaTareas[index]);
});

app.delete("/id/:id",validateId,(req,res)=>
{
    const id=parseInt(req.params.id);

    const index=listaTareas.findIndex(item=>item.id==id);
    if(index==-1)
        return res.status(404).json({error:"The indicated id doesn't match with any register in the task list."});

    const deletedTask=listaTareas.splice(index,1);
    idAvailable.push(deletedTask[0].id);
    res.json(deletedTask[0]);
});

app.get("/",(req,res)=>{
    res.json(listaTareas);
});

app.get("/isCompleted/:isCompleted",validateIsCompleted,(req,res)=>
{
    let isCompleted=req.params.isCompleted;

    isCompleted=isCompleted==="true"?true:false;

    const listFilter=listaTareas.filter(item=>item.isCompleted===isCompleted);
    res.json(listFilter);
});

app.get("/id/:id",validateId,(req,res)=>
{
    const id=parseInt(req.params.id);

    const index=listaTareas.findIndex(item=>item.id==id);
    if(index==-1)
        res.status(404).json({error:"The indicated id doesn't match with any register in the task list."});
    else
    {
        const task=listaTareas[index];
        res.json(task);
    }
});

app.listen(port,()=>{
    console.log("Server listening in localhost:"+port);
});