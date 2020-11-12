const mysql = require("mysql");
const inquirer = require("inquirer");
// const { log } = require("console");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "allblack",
    database: "Employee_TrackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    questionPrompt();
});

function questionPrompt() {
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update an employee role",
            "Exit"
        ]
    }).then(answer => {
        switch (answer.choice) {
            case "View all employees":
                viewEmployees();
                break;

            case "View all departments":
                viewDepartments();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Add a department":
                addDepartment();
                break;

            case "Add a role":
                addRole();
                break;

            case "Update an employee role":
                updateEmployee();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        questionPrompt();
    });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        questionPrompt();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "number",
            name: "roleID",
            message: "What is the employee's role ID?"
        },
        {
            type: "number",
            name: "managerID",
            message: "What is the employee's manager's ID?"
        },
    ]).then(function (res) {
        connection.query('INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleID, res.managerID], function (err, data) {
            if (err) throw err;
            console.table("Employee added!");
            questionPrompt();
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What department would you like to add?"
        },
    ]).then(function (answer) {
        connection.query('INSERT INTO department (name) VALUES (?)', [answer.department], function (err, data) {
            if (err) throw err;
            console.table("Department added!");
            questionPrompt();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter role title"
        },
        {
            name: "salary",
            type: "number",
            message: "Enter role salary"
        },
        {
            name: "departmentID",
            type: "number",
            message: "Enter department ID"
        },
    ]).then(function (answer) {
        connection.query("INSERT INTO roles (title, salary, departmentID) values (?, ?, ?)", [answer.title, answer.salary, answer.departmentID], function (err, data) {
            console.table(data);
        })
        questionPrompt();
    });
}

function updateEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Which employee would you like to update? (first name)"
        },
        {
            name: "roleID",
            type: "number",
            message: "Enter the new role ID"
        }
    ]).then(function (answer) {
        connection.query("UPDATE employee SET roleID = ? WHERE firstName = ?", [answer.roleID, answer.firstName], function (err, data) {
            console.table(data);
        })
        questionPrompt();
    });
}
