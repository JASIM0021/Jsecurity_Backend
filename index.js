const { log } = require('console');
require('dotenv').config();
const express=require('express');
const UserRoute=require('./routes/auth')
const PostRoute=require('./routes/posts')
const Device =require('./routes/device')
const app = express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const PORT=process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())

app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).json({
        msg:"server failed to connect"
    })
})

app.use('/api/auth',UserRoute)
app.use('/posts',PostRoute)
app.use('/api',Device)


app.listen(PORT,()=>{
    log(`Server listening on port ${PORT}`)
})