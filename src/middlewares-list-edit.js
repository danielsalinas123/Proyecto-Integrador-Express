const validateBody=(req,res,next)=>
{
    const body=req.body;
    if(Object.values(body).length==0){
        res.status(400).send("The body of the request is empty and it's required to add or update a task.");
    }else{
        next();
    }
}

const validateIdDescription=(req,res,next)=>
{
    const body=req.body;

    const validateID=Object.keys(body).some(key=>key=="id");
    const validateDescription=Object.keys(body).some(key=>key=="description");
    
    let validationsOk=true;

    if(!validateID)
    {
        res.status(400).send("The id attribute is required to add or update a task.");
        validationsOk=false;
    }
    else if(isNaN(parseInt(body.id)))
    {
        res.status(400).send("The id attribute must have a numeric value.");
        validationsOk=false;
    }
    else if(!validateDescription)
    {
        res.status(400).send("The description attribute is required to add or update a task.");
        validationsOk=false;
    }
    else if(body.description=="")
    {
        res.status(400).send("The description attribute can't be empty.");
        validationsOk=false;
    }
    
    if(validationsOk)
        next();
}

const validateIsCompleted=(req,res,next)=>
{
    const validateIsCompleted=Object.keys(req.body).some(key=>key=="isCompleted");

    let validationOk=true;

    if(!validateIsCompleted)
    {
        res.status(400).send('The "isCompleted" attribute is required to update a new task.');
        validationOk=false;
    }
    else if(typeof(req.body.isCompleted)!="boolean")
    {
        res.status(400).send('The "isCompleted" attribute must have a boolean value.');
        validationOk=false;
    }

    if(validationOk)
        next();
}

module.exports={validateBody,validateIdDescription,validateIsCompleted};