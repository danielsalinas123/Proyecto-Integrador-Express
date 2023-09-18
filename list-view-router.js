const express=require("express");
const router=express.Router();

const listaTareas=require("./listaTareas");

router.get("/isCompleted/:isCompleted",(req,res)=>
{
    let status = req.params.isCompleted;

    if(status==="true")
        status=true;
    else if(status==="false")
        status=false
    else
        status=undefined;

    if(typeof(status)=="boolean")
    {
        const answerList=listaTareas.filter(item=>item.isCompleted==status);
        res.send(answerList);
        //console.log(answerList);
    }
    else
    {
        res.status(404).send("The parameter 'isCompleted' doesn't have a valid boolean value.");
        console.log("The type of 'isCompleted' is: "+typeof(status));
    }
    
});

module.exports=router;