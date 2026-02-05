// j'importe le module express
const express = require('express')
// on vas appeler la fonction express
const app = require('./app')



app.listen(process.env.PORT ||3000)