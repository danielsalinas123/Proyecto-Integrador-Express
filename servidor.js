const express=require("express");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

const app = express();
const port = 8080;

app.use(express.json());
dotenv.config();

const {checkMethod,validateUserPassword,validateBody,JWTValidation}=require("./src/middlewares/middlewares-general");
app.use(checkMethod);

const listaTareas=require("./src/data bases/listaTareas");
let users=require("./src/data bases/users");

const listRouter=require("./list-view-router");
app.use("/view",listRouter);

const editRouter=require("./list-edit-router");
app.use("/edit",editRouter);

app.get("/",(req,res)=>
{
    res.status(200).send(listaTareas);
    console.log(listaTareas);
});

app.post("/login",validateBody,validateUserPassword,(req,res)=>
{
    const user=req.body.user;
    const password=req.body.password;

    const index=users.findIndex(item=>item.user==user);
    if(index==-1)
        return res.status(404).send("The user is not registered.");
    else if(users[index].password!=password)
        return res.status(404).send("The password entered does not match.");

    const role=users[index].role;
    const token=jwt.sign({role},process.env.SECRECT_KEY);

    res.header("authorization",token).json({token});
});

app.get("/clients",JWTValidation,(req,res)=>
{
    const role=req.headers.role;

    if(role=="admin")
        return res.send("The client is a administrator.");

    if(role=="user")
        return res.send("The client is an user.");
});

app.listen(port,()=>{
    console.log("Server listening in localhost:"+port);
});