const express = require("express")
const app = express()
const mongoose = require("mongoose")
const url = "mongodb+srv://headtwerk:mechaJAX1.@cluster0.2v8kk.mongodb.net/sl_lab_db?retryWrites=true&w=majority"
const librarySchema = require('./librarySchema')

mongoose.connect(url).then(()=>console.log("...connected to db"))
app.use(express.json())
app.post("/add-new-post", async(req, res)=>{
    const booktitle = req.body.title
    const bookauthor = req.body.author
    const booktype = req.body.type
    const bookborrowed = req.body.borrowed

    if(req.body.batch){
        librarySchema.create(req.body.batch, function(err){
            if(err) res.send(err)
            else res.json(req.body)
        })
    }
    else{
        try{
            const newBook = new librarySchema(
                {
                    title: booktitle,
                    author:bookauthor,
                    type:booktype,
                    borrowed:bookborrowed,
                }
            )
            const savedBook = await newBook.save()
            res.json({
                'message': 'new book added',
                'data': savedBook,
            })
        }catch(err){
            res.json(err)
        }    
    }
})

app.use("/", (req, res)=>{
    // res.send("Library")
    res.json(
        {"message": "Library server has started"},
    )
})

app.listen(3000, ()=>console.log("...library server started"))

