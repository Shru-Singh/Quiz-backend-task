const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
        question: {
               type: String,
               required: true
           },
        answer: {
               type: String,
               required: true,
               default:""
           }
})


module.exports = mongoose.model('Question', QuestionSchema)