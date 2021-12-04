const mongoose =  require('mongoose')
const {Schema} = mongoose

const bookSchema = new Schema ({
    title: String,
    author: String,
    type: String,
    borrowed: String,
})

module.exports = mongoose.model('books', bookSchema, "library_system")