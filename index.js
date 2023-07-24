const express = require('express');
const app = express();
const employees = require('./Employees');
const moment = require('moment'); 

app.use(express.json());


const PORT = process.env.PORT || 4000; //in dev

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));