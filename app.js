require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const {
    MongoClient,
    ObjectId
} = require('mongodb')
const bodyParser = require('body-parser')
const db = require('./database/mongodb')

const webRouter = require("./routes/web-routes")
const carsAPIRouter = require('./routes/api/cars-api-router')

console.log(process.env);

const app = express()

app.engine('hbs', exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))

app.set("view engine", "hbs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/', webRouter)
app.use('/api/cars', carsAPIRouter)

app.listen(8000, () => {
    console.log("http://localhost:8000");
})