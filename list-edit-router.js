const express=require("express");
const router=express.Router();

let listaTareas=require("./listaTareas");

router.post("/id/:id/description/:description",(req,res)=>
{

    const id = req.params.id;
    const description = req.params.description;

    let verification=false;
    listaTareas.filter(item=>{
        if(item.id==id)
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

router.delete("/id/:id",(req,res)=>
{
    const id = req.params.id;
    const index=listaTareas.findIndex((item)=>item.id==id);
    if(index==-1)
        res.status(404).send("The indicated id ("+id+") doesn't match with any register in the task list.");
    else
    {
        listaTareas.splice(index,1);
        res.send(listaTareas);
        //console.log(listaTareas);
    }
});

router.put("/id/:id/isCompleted/:isCompleted/description/:description",(req,res)=>
{
    const id=req.params.id;
    const description=req.params.description;
    let isCompleted=req.params.isCompleted;

    if(isCompleted==="true")
        isCompleted=true;
    else if(isCompleted==="false")
        isCompleted=false;
    else
        isCompleted=null;

    const index=listaTareas.findIndex((item)=>item.id==id);
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