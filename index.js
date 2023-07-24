const express = require('express');
const app = express();
const employees = require('./Employees');

app.use(express.json());

//setting up the route
app.use('/api/employees', require('./routes/api'))

const PORT = process.env.PORT || 4000; //in dev

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));