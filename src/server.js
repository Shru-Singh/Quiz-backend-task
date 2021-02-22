const express = require('express')
const mongoose =require ('mongoose')
const cors = require('cors')
const session = require('express-session');
const quizRouter = require('./routes/quizroutes')
const userRouter = require("./routes/userroutes");
const app = express()

require("./models/User")
require('./config/passport');


app.use(cors())
app.use(express.json())
app.use('/Question', quizRouter);
app.use('/User', userRouter);

app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })

const db= mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'))


app.listen(8000, ()  => {
    console.log("The API is running....")
})