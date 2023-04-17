const express = require('express')
const app = express()

app.all('/', (req, res, next) => {
    console.log("ALL IN")

    next();
})

app.get('/', (req, res) => {
    console.log("GETTING");
    res.send("Response to GET request")
})

app.post('/', (req, res) => {
    console.log("POSTING");
    res.send("Response to POST request")
})

app.put('/', (req, res) => {
    console.log("PUTTING");
    res.send("Response to PUT request")
})

app.delete('/', (req, res) => {
    console.log("DELETING");
    res.send("Response to DELETE request")
})

app.get('/hello', (req, res) => {
    console.log("HELLOING");
    res.send("Response to HELLO request")
})
app.get('/users/:username', (req, res) => {
    console.log("USERING");
    const usernameParam = req.params.username
    res.send({usernameParam})
})

app.get('/multiple', (req, res, next) => {
    console.log("Multiple #1");
}, (req, res) => {
    console.log("Multiple #2");

    res.send("MULTIPLE")
})

const middlewareFunc = (req, res, next) => {
    console.log("In the middle");
    //Login check/Auth check
    if (loggedIn) {
        next()
    } else {
        res.sendStatus(403)
    }
}

app.get('/middle1', middlewareFunc, (req, res) => {
    res.send("After middle1")
})
app.get('/middle2', middlewareFunc, (req, res) => {
    res.send("After middle2")
})

app.listen(8000, () => {
    console.log("http://localhost:8000");
})