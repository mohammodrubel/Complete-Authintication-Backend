require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 9000; 
const mongooseConnection = require('./db.js')
const userRouter = require('./Router/users')


app.use(express.json());
app.use(cors());

// mongoose connection 
mongooseConnection(process.env.MONGOOSE_CONNECTION)




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users',userRouter)

app.use((err,req,res,next)=>{
  const message = err.message  ? err.status : 'server error ' 
  const status = err.status ? err.status : 500
  res.status(status).json({
    message
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
