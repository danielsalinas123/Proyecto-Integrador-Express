const validateId=(req,res,next)=>
{
    const validateIdBody=Object.keys(req.body).some(key=>key=="id");
    const validateIdParams=Object.keys(req.params).some(key=>key=="id");
    
    if(!validateIdBody && !validateIdParams)
        return res.status(400).json({error:"The id is required."});

    const id=req.body.id || req.params.id;

    if(isNaN(parseInt(id)))
        return res.status(400).json({error:"The id value must be a numeric value."});

    next();
}

const validateIsCompleted=(req,res,next)=>
{
    const validateIsCompletedBody=Object.keys(req.body).some(key=>key=="isCompleted");
    const validateIsCompletedParams=Object.keys(req.params).some(key=>key=="isCompleted");
    
    if(!validateIsCompletedBody && !validateIsCompletedParams)
        return res.status(400).json({error:"The 'isCompleted' key is required."});

    let isCompleted=validateIsCompletedBody ? req.body.isCompleted : req.params.isCompleted;

    if(validateIsCompletedParams)
    {
        if(isCompleted==="true" || isCompleted==="false")
            return next();
        else
            isCompleted=undefined;
    }
 
    if(typeof(isCompleted)!="boolean")
        return res.status(400).json({error:"The 'isCompleted' value must be a boolean value."});

    next();
}

const validateDescription=(req,res,next)=>
{
    const validateDescription=Object.keys(req.body).some(key=>key=="description");

    if(!validateDescription)
        return res.status(400).json({error:"The description is required."});

    const description=req.body.description;

    if(description=="")
        return res.status(400).json({error:"The description value can't be empty."});

    next();
}

module.exports={validateDescription,validateId,validateIsCompleted};