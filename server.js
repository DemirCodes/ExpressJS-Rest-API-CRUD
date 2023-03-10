const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productModule')

app.use(express.json())
app.use(express.urlencoded({extended:false}))


//routes
app.get('/',(req,res)=>{
    res.send("Hello node api")
})

app.get('/blog',(req,res)=>{
    res.send("Hello blog")
})

app.get('/products', async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({products})  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/products',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)

    }catch (error){
        console.log(error.message);
        res.status(500).json({massage:error.message})
    }
})

app.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)

    }catch (error){
        console.log(error.message);
        res.status(500).json({massage:error.message})
    }
})

//update 
app.put('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message:`Cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({massage:error.message})
    }
})


// delete

app.delete('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({massage:error.message})
    }
})






mongoose.set("strictQuery",false)
mongoose.
connect('mongodb+srv://admin:<password>@crud.qvqs0f5.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=>{
        console.log(`NODE API app is running on port 3000`)
    })
    
    console.log('connected to Mongodb')
}).catch((error)=>{
    console.log(error)
})
