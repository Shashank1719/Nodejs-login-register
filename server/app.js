const dotenv = require('dotenv');
const express = require('express')
const app = express()
dotenv.config({path: './config.env'});

const port = process.env.PORT || 8080;


// db
require('./db/connection');

app.use(express.json());

app.use(require('./routes/auth'));
// // middlewares
// const middleware = (req, res, next) => {
//     console.log("MiddleWares");
//     next();
// }



app.listen(port, () => console.log(`Example app listening on port ${port}!`))