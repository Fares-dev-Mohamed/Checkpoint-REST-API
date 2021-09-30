const express = require('express')
const app= express() 
const mongoose = require ('mongoose')
const User = require('./models/User')


mongoose.
connect('mongodb://localhost:27017/restapi')
.then (()=>console.log('DB connected'))
.catch(err=>console.log(err))

app.use(express.json())
// :http://localhost:4001/all
 
app.get('/all',(req,res)=>{
    User.find()
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
  })


// :http://localhost:4001/add

app.post('/add',(req,res)=>{
    const {name,age, phone, email }=req.body
    const newUser= new User({
      name,
      age,
      phone,
      email
    })
    newUser.save()
    .then(user=>res.send(user))
    .catch((err=>console.log(err))) 
  })

// :http://localhost:4001//edit/:_id

app.put('/edit/:_id',(req,res)=>{
    const {_id}=req.params
    const {name,email,phone}=req.body
    User.findByIdAndUpdate ({_id},{$set:{name,
    age,
    phone,
    email}})
    .save()
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
  })

  // :http://localhost:4001//delete/:_id
   app.delete('/delete/:_id',(req,res)=>{
    const {_id}=req.params
    User.findByIdAndRemove ({_id})
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
  })





app.listen(4001,(error)=>{
    if (error) console.log('serveur is not running')
    else console.log ('sever is running on port 4001')
})