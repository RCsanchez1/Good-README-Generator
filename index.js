const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name of the project?"
        },
        {
            type: "input",
            name: "description",
            message: " Describe the project."
        },
        {
            type: "input",
            name: "Table of Contents",
            message: "What are the Table of Contents"
        },
        {
            type: "input",
            name: "food",
            message: "What is your favorite food?"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        },
        {
            type: "input",
            name: "linkedin",
            message: "Enter your LinkedIn URL."
        }
    ]);
}

function generateHTML(answers) {
    return `
    #${answers.name}
    <h5>Discription:</h5>
    <p class="lead"> ${answers.description}.</p>
    <h3><span class="badge badge-secondary">Table of Contents</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
 >`;
}

promptUser()
    .then(function (answers) {
        const md = generateHTML(answers);

        return writeFileAsync("README.md", md);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });

