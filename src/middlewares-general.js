const checkMethod=(req,res,next)=>
{
    const method=req.method;
    if(method=="GET" || method=="POST" || method=="DELETE" || method=="PUT"){
        next();
    }
    else
        res.status(400).send("The indicated HTTP method in the request isn't valid.");
}

module.exports={checkMethod};