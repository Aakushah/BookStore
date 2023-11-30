
import express from 'express'
import {Book} from '../models/bookModel.js'


const router=express.Router();

//Route for creating collection in db
router.post('/', async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send(
                  {message:`fill all the required field`}  
            )
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear,
        }
        const book=await Book.create(newBook);   
        return res.status(201).send(book);   
    }
    catch(error){
       console.log(error.message)
       res.status(500).send({message:error.message}) 
    }
})

//route for get all books from database
router.get('/',async (req,res)=>{
    try{
        const books = await Book.find()
        return res.status(200).json({
            count:books.length,
            data:books,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:error.message});
    }
})

//route for get one  book from database by id
router.get('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const books = await Book.findById(id)
        return res.status(200).json(books);
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:error.message});
    }
})

//route for updating books details from db
router.put('/:id',async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )
        {
            return res.status(400).send(
                  {message:`fill all the required field`}  
            )
        }

        const {id}=req.params;
        
        console.log(id)

        const result= await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({message:'Book not found'})
        }

        return res.status(200).send({message:'Book updated successfully'})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message})
    }

})

//delete a book from the db
router.delete('/:id',async (req,res)=>{
    try{
        const {id}=req.params;
        const results = await Book.findByIdAndDelete(id)
        if(!results){
            return res.status(400).json({message:'Book not found'});
        }
        return res.status(200).send({message :'Book deleted successfully'})

    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message})
    }
})



export default router;

