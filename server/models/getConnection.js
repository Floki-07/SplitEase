const mongoose=require('mongoose')

const DB_URI=process.env.DB_URI


mongoose.connect(DB_URI)
.then(() => { 
    console.log('MongoDB is connneted');
    
 }).catch((err) => { 
    console.log('Error while connecting to database');
  })