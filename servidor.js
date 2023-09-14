const express=require("express");

const app = express();

app.use(express.json());

const port = 8080;

let listaTareas = [
    {
        "id":"123456",
        "isCompleted":false,
        "description":"Walk the dog"
    },
    {
        "id":"654321",
        "isCompleted":true,
        "description":"make the bed"
    },
    {
        "id":"135246",
        "isCompleted":false,
        "description":"go to church"
    }
];

app.get("/",(req,res)=>
{
    res.status(200).send(listaTareas);
});

app.listen(port,()=>{
    console.log("Seridor escuchando en localhost:",port);
});