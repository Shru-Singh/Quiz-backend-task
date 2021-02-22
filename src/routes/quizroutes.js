const express = require ('express')
const router = express.Router()
const Question = require('../models/Question')
const auth = require('../middleware/auth');



//get all quiz questions
router.get('/questions', auth.required, async (req,res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)

    }catch (error){
        return res.status(500).json({"error": error})
    }

})

//get one quiz question
router.get('/questions/:id', auth.required, async (req,res) => {
    try {
        const _id = req.params.id

        const questions = await Question.findOne({_id})
        if(!questions){
            return res.status(404).json({})
        }else{
            return res.status(200).json(questions)
        }
    }catch (error){
        return res.status(500).json({"error": error})
    }
})
//create one quiz question
router.post('/questions', auth.required, async (req,res) => {
    try {
        const {question} = req.body
        const {answer} = req.body

        const questions = await Question.create ({
        question,
    answer
        })

        return res.status(201).json(questions)
    }catch (error){
        return res.status(500).json({"error": error})
    }

})
// update one quiz question
 router.put('/questions/:id', auth.required, async (req,res) => {
     try {
       const _id = req.params.id
       const { question, answer } = req.body
       let ques = await Question.findOne({_id})
       if(!ques){
                 ques = await Question.create({
                question,
               answer
             })
           return res.status(201).json(ques)
        }else{
           ques.question= question
           ques.answer = answer
    await ques.save()

   
             return res.status(200).json(ques)
 }
     }catch (error){
return res.status(500).json({"error": error})
    }

 })
//delete one quiz question
router.delete('/questions/:id',auth.required,  async (req,res) => {
    try {
        const _id = req.params.id

        const questions = await Question.deleteOne({_id})
        if(questions.deletecount === 0){
            return res.status(404).json({})
        }else{
            return res.status(204).json()
        }
    }catch (error){
        return res.status(500).json({"error": error})
    }

})


module.exports = router