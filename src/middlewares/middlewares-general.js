const jwt=require("jsonwebtoken");

const checkMethod=(req,res,next)=>
{
    const method=req.method;
    if(method=="GET" || method=="POST" || method=="DELETE" || method=="PUT"){
        next();
    }
    else
        res.status(400).send("The indicated HTTP method in the request isn't valid.");
}

const validateBody=(req,res,next)=>
{
    const body=req.body;
    if(Object.values(body).length==0){
        res.status(400).send("The body of the request is empty and it's required.");
    }else{
        next();
    }
}

const validateUserPassword=(req,res,next)=>
{
    const validateUser=Object.keys(req.body).some(key=>key=="user");
    const validatePassword=Object.keys(req.body).some(key=>key=="password");
    
    if(!validateUser)
        return res.status(400).send("The user key is required to log in.");
    if(!validatePassword)
        return res.status(400).send("The password key is required to log in.");
    
    const user=req.body.user;
    const password=req.body.password;

    if(typeof(user)!="string" || user==="")
        return res.status(400).send("The user value is required to log in.");
    if(typeof(password)!="string" || password==="")
        return res.status(400).send("The password value is required to log in, this one must be of string type.");

    next();
}

function JWTValidation(req,res,next)
{
    const token=req.headers.authorization;

    jwt.verify(token,process.env.SECRECT_KEY,(err,payload)=>
    {
        if(err)
            res.status(400).json({err});
        else
        {
            req.headers={...req.headers,role:payload.role};
            next();
        }
    });
}

module.exports={validateBody,checkMethod,validateUserPassword,JWTValidation};