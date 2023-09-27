const express=require ("express");
require("./db/conn");
const app =express();

const PORT=5000;
const Student =require ("./model/student");

app.use(express.json());

// create a new student registration

// Using promises.
//  app.post("/students",(req,res)=>{
//      console.log(req.body);
//      const user = new Student(req.body);

//      user.save().then( ()=>{
//          res.send(user);
//      }).catch((e)=>{
//         res.send(e);
//     })


//     res.send("hello from other side");
    
// })

// POST (create)using async await

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
// Update Students
app.patch("/students/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const updateStudent= await Student.findByIdAndUpdate(id,req.body,{
            new:true  
        });
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(updateStudent);
    }catch(e){
        res.status(500).send(e);
    }
})


// Delete the students by id
app.delete("/students/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteStudent= await Student.findByIdAndDelete(id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})



app.listen(PORT,()=>{
    console.log(`Port is running at ${PORT}`)
})