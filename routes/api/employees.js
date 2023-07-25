const express = require('express');
const router = express.Router();
const moment = require('moment');
const employees = require('../../Employees');

//retreive all employee
router.get('/', (req, res) => {
    res.json(employees);
})

//retreive single employee
router.get('/:name', (req, res) => {
    const checkExists = employees.some(employee => employee.name === req.params.name);
    if(checkExists) {
    res.json(employees.filter(employee => employee.name === req.params.name));
    }else {
        //400 status bad  request
        res.status(400).json({msg: `Employee ${req.params.name} doesn't exist`});
    }
})

//create employee

router.post ('/', (req, res) => {
    const newEmployee = {
        name: req.body.name,
        email: req.body.email,
        age: Math.round(Math.random() * (100 - 18) + 18),
        added: `${moment().format()}`
    }

    if(!newEmployee.name || !newEmployee.email) {
        res.status(400).json({msg: 'Please include both a name and an email! Thanks!'})
    }

    employees.push(newEmployee);
    res.json(employees);
});

//update employee list

router.put('/:name', (req, res) => {
    const checkExists = employees.some(employee => employee.name === req.params.name);

    if(checkExists) {
        const updateEmployee = req.body;
            employees.forEach(employee => {
                if(employee.name === req.params.name) {
                    employee.name = updateEmployee ? updateEmployee.name : employee.name;
                    res.json({msg: `Employee updated`, employee});
                }
            })
                } else {
                    res.status(400).json({msg: `Employee ${req.params.name} doesn't exist`}); 
                }
});

router.delete('/:name', (req, res) => {
    const checkExists = employees.some(employee => employee.name === req.params.name);

    if(checkExists) {
        res.json({
            msg: 'Employee deleted',
            employees: employees.filter(employee => employee.name !== req.params.name)});
                } else {
                    res.status(400).json({msg: `Employee ${req.params.name} doesn't exist`}); 
                }
})

module.exports = router;