const express=require('express');
const app=express();
const mongoose=require('mongoose');

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/cars',{useNewUrlParser:true,useUnifiedTopology:true},
(err)=>{
    if(err){console.log('Error')}else{console.log("Data Base Connected")}
});
const format=({
    name:String,
    cost:String,
    mileage:String,
    id:Number
})
const model=mongoose.model('brands',format)
app.post('/post',(req,res)=>{
    const data =new model({
        name:req.body.name,
        cost:req.body.cost,
        mileage:req.body.mileage,
        id:req.body.id
    });
    const val= data.save();
    res.send('New Data Added..')
});
app.put('/update/:id',(req,res)=>{
    let updateid=req.params.id;
    let updatename=req.body.name;
    let updatecost=req.body.cost;
    let updatemileage=req.body.mileage;
    model.findOneAndUpdate({id:updateid},{$set:{name:updatename,cost:updatecost,mileage:updatemileage}},{new:true},(err,data)=>{
        if(err){res.send('Error')}else{
            if(data==null){res.send("Id Not Matching..")}
            else{res.send(data)}
        }
    })
});
app.delete('/del/:id',(req,res)=>{
    let delid=req.params.id;
    model.findOneAndDelete({id:delid},(err,data)=>{
        if(err){res.send("Error")}else{
            if(data==null){
                res.send('Id not matching...')
            }else{res.send("Deleted")}
        }
    })
});
app.get('/get',(req,res)=>{
    model.find((err,data)=>{
      if(err){res.send('Failed to Fetch data')}else{
        res.send(data)
      }  
    })
});
app.get('/get/:id',(req,res)=>{
    let getid=req.params.id;
    model.findOne({id:getid},(err,data)=>{
        if(err){
            res.send('Error')
        }else{res.send(data)}
        if(data==null){res.send('id not matching')}
    })
})
app.listen(5000,()=>{console.log('SERVER RUNNING.....')})