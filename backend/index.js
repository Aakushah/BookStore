import express, { request, response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import {Port,mongoDBURL} from './config.js'

import bookRoutes from './routes/bookRoute.js'

const app=express();



//middleware for parsing request body
app.use(express.json())

//middleware for handling CORS policy
//option 1:allow all origin with default of cors(*)
app.use(cors())
//Option 2:allow custom origins
app.use(
    cors({
        origin:'http://localhost:/4000',
        methods:['GET','PUT','DELETE','CREATE'],
        allowedHeaders:['Content-type'],
    })
);

app.get('/',(req,res)=>{
    res.send("<H1>HELLO</H1>")
})


app.use('/books',bookRoutes)



mongoose.connect(mongoDBURL).then(()=>{
        console.log("App connected to database");
        app.listen(Port,()=>{
            console.log(`app is listening to port :${Port}`)
        })
        
}).catch((error)=>{
    console.log(error);
})



