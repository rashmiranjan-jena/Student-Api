const express=require ("express");
require("./db/conn");
const app =express();

const PORT=5000;
const Student =require ("./model/student")

app.use(express.json());

// create a new student registration API
// app.get("/",(req,res)=>{
//     res.send("hello from other side rashmi");
// });

// Using promises.
//  app.post("/students",(req,res)=>{
//      console.log(req.body);
//      const user = new Student(req.body);

//      user.save().then( ()=>{
//          res.send(user);
//      }).catch((e)=>{
//         res.send(e);
//     })


    // res.send("hello from other side");
    
// })

// using async await

app.post("/students",async(req,res)=>{

    try{
        const user = new Student(req.body)
    const createUser =await user.save();
    res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e);
    }
    
})

// Get methord using Async await
app.get("/students",async(req,res)=>{
    try{
        const studentsData =await Student.find()
         res.send(studentsData);
    }catch(e){
        res.send(e);
    }
})

// get indivisual student data using id
app.get("/students/:id", async(req,res)=>{
    try{
        const _id= req.params.id;
        const studentData=await Student.findById(_id);
        console.log(studentData);
        if(studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.send(e);
    }
})


app.listen(PORT,()=>{
    console.log(`Port is running at ${PORT}`)
})