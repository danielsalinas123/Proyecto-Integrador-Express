const express=require("express");
const router=express.Router();

let listaTareas=require("./listaTareas");

const {validateBody,validateIdDescription,validateIsCompleted}=require("./src/middlewares-list-edit");

router.post("/",validateBody,validateIdDescription,(req,res)=>
{

    const id = parseInt(req.body.id);
    const description = req.body.description;

    let verification=false;
    listaTareas.filter(item=>{
        if(parseInt(item.id)==id)
            verification=true;
    });

    if(!verification)
    {
        const newTask={id:id,isCompleted:false,description:description};
        listaTareas.push(newTask);
        res.send(listaTareas);
        //console.log(listaTareas);
    }
    else
        res.status(404).send("The indicated id ("+id+") is already in the task list and this one must be unique.");
   
});

router.delete("/:id",(req,res)=>
{
    const id = parseInt(req.params.id);
    const index=listaTareas.findIndex((item)=>parseInt(item.id)==id);
    if(index==-1)
        res.status(404).send("The indicated id ("+id+") doesn't match with any register in the task list.");
    else
    {
        listaTareas.splice(index,1);
        res.send(listaTareas);
        //console.log(listaTareas);
    }
});

router.put("/",validateBody,validateIdDescription,validateIsCompleted,(req,res)=>
{
    const id=parseInt(req.body.id);
    const description=req.body.description;
    const isCompleted=req.body.isCompleted;

    const index=listaTareas.findIndex((item)=>parseInt(item.id)==id);
    if(index==-1)
        res.status(404).send("The indicated id ("+id+") doesn't match with any register in the task list.");
    else
    {
        listaTareas[index].isCompleted=isCompleted;
        listaTareas[index].description=description;
        res.send(listaTareas[index]);
        //console.log(listaTareas[index]);
    }
});

module.exports=router;