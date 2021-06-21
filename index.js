const mysql = require('mysql');
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'root1234',
    database: 'employee_managmentDB',
});

connection.connect((err)=>{
    if (err) throw err;
    runManagment();
})

const  runManagment = ()=>{
    inquirer.prompt({
        name: 'choose',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            "View All Employee By Department",
            "View All Roles",
            "Add Employee",
            "Add Role",
            "Add Deparment",
            "Update Employee Role",
        ],
    })
    .then((answer)=>{
        switch (answer.choose){
            case "View All Employees":
                console.log("+++");
                allEmployees();
                break;
            case "View All Roles":
                allRoles();
                break;
            case "View All Department":
                allEmployeesDepartment();
                break;

            case "Add Employee":
                addEmployee();
                console.log("++++");
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Deparment":
                addDepartment();
                break;    
            case "Update Employee Role":
                updateRole();
                break;
        }
    });
};


const  allEmployees = () =>{
    let query = 
    "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, departments.department_name FROM employees";
    query +=" JOIN roles ON (employees.role_id = roles.id) JOIN departments ON (roles.department_id = departments.id)";
    connection.query(query, (err, res) =>{
        if(err) throw(err);
        console.table(res);
        runManagment();
    })
};
const  allRoles = () =>{
    let query = 
    "SELECT * FROM roles";
    connection.query(query, (err, res) =>{
        if(err) throw(err);
        console.table(res);
        runManagment();
    })
};
const   allEmployeesDepartment = () =>{
    let query = 
    "SELECT * FROM departments";
    connection.query(query, (err, res) =>{
        if(err) throw(err);
        console.table(res);
        runManagment();
    })
};


const addEmployee = () =>{
    inquirer
        .prompt([
        {
            name: 'firstname',
            type: 'input',
            message: 'What is the employees first name?',
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'What is the employees last name?',
        },
        {
            name: 'role',
            type: 'input',
            message: 'What is the employees role ID?',
        },
    ])
    .then((answer) =>{
        connection.query(
            'INSERT INTO employees SET ?', {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id:answer.role,
            }, (err) =>{
                if(err) throw err;
                console.log('New Employee Successfull.');
                runManagment();
            }
        )
    })
};
const addRole = () =>{
    inquirer
        .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the Role Title?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the Role Salary',
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'What is the Department ID?',
        },
    ])
    .then((answer) =>{
        connection.query(
            'INSERT INTO roles SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id:answer.departmentID,
            }, (err) =>{
                if(err) throw err;
                console.log('New Role Successfull.');
                runManagment();
            }
        )
    })
};
const addDepartment = () =>{
    inquirer
        .prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'What is the Department Name?',
        },

    ])
    .then((answer) =>{
        connection.query(
            'INSERT INTO departments SET ?', {
                department_name: answer.departmentName,
            }, (err) =>{
                if(err) throw err;
                console.log(' New Department Successfull.');
                runManagment();
            }
        )
    })
};



const  updateRole = () => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if(err) throw err;
        inquirer.prompt([
            {
                name: "selectEmp",
                type: "list",
                message: "Select employee's",
                choices: function () {
                    let choiceList = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceList.push(res[i].employees_name);
                    }
                    return choiceList;
                }
            
            }
        ])
        .then(function(answer) {
            inquirer.prompt([
                {
                    name: "selectedEmp",
                    type: "input",
                    message: "What is there employee ID for this new role?"
                },
            ])
            .then(function (updatedRole) {
                connection.query("UPDATE employees SET role_id = ? WHERE employees_name = ?", [updatedRole.selectEmp, answer.updatedRole]);
                console.log("Employee role update succesful.");
                runManagment();
            })
        });
    })
};
