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
        //{
        //type: "input",
        //name: "Table of Contents",
        //message: "What are the Table of Contents"
        //},
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
    
   
## Discription 
    ${answers.description}

## Table of Contents

### <li><a href="#License">License</a></li>

### <li>Contributing</li>

### <li>Tests</li>

### <li>Questions</li>



## Installation
${answers.github}
     

## Usage
${answers.linkedin}


## Contributing
${answers.linkedin}


## Tests
${answers.linkedin}



## Questions
${answers.linkedin}


## id ="License"
${answers.linkedin}







 `;
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

