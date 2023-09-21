const validateIsCompletedParameter = (req,res,next)=>
{
    const isCompleted=req.params.isCompleted;

    if(isCompleted=="true" || isCompleted=="false")
        next();
    else
        res.status(400).send('The "isCompleted" parameter must be a boolean value.');
}

module.exports={validateIsCompletedParameter};