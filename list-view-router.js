const express=require("express");
const router=express.Router();

const listaTareas=require("./listaTareas");

const {validateIsCompletedParameter}=require("./src/middlewares-list-view");

router.get("/:isCompleted",validateIsCompletedParameter,(req,res)=>
{
    let status=null;
    if(req.params.isCompleted=="true")
        status=true;
    else
        status=false;

        const answerList=listaTareas.filter(item=>item.isCompleted==status);
        res.send(answerList);
});

module.exports=router;