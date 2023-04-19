require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const {
    MongoClient,
    ObjectId
} = require('mongodb')
const bodyParser = require('body-parser')
const db = require('./database/mongodb')

const webRouter = require("./routes/web-router")
const carsAPIRouter = require('./routes/api/cars-api-router')

console.log(process.env);

const app = express()

app.engine('hbs', exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))

app.set("view engine", "hbs")


////// Public Folder //////
app.use(express.static("public"))

////// Body Parser //////
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

////// Web Router //////
app.use('/', webRouter)
app.use('/api/cars', carsAPIRouter)

app.get('/new-car', (req, res) => {
    res.render("new-car")
})





app.listen(8000, () => {
    console.log("http://localhost:8000");
})