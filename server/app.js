
const express=require('express')
const cors=require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();
require('./models/getConnection')
///write authRouter import here
const authrouter=require('./routers/authrouter')
app.use(cors());
app.use(express.json());

app.use('/auth',authrouter)
// app.use("/record", records);

app.get('/',(req,res) => { 
  res.send('HI')
 })

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

