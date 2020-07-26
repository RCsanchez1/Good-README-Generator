const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "Title",
            message: "What is the name of the project?"
        },
        {
            type: "input",
            name: "description",
            message: " Describe the project."
        },
        {
            type: "input",
            name: "Installation",
            message: "How would you run or install?"
        },
        {
            type: "input",
            name: "Usage",
            message: "How would you use it?"
        },
        {
            type: "input",
            name: "Contributing",
            message: "State if you are open to contributions and what your requirements are for accepting them."
        },
        {
            type: "input",
            name: "Tests",
            message: "write some tests for your application"
        },
        {
            type: "input",
            name: "Github",
            message: "What is your github username?"
        },
        {
            type: "input",
            name: "Email",
            message: "What is your Email?"
        },
        {
            type: "list",
            name: "License",
            message: "what license would you like to add?",
            choices: [
                "GNU AGPLv3",
                "GNU GPLv3",
                "MIT",
                "Boost Software 1.0"
            ]
        }
    ]);
}

function generateMD(answers) {
    return `

# ${answers.Title}

<img alt="GitHub" src="https://img.shields.io/github/license/mashape/apistatus?color=blue&style=plastic">
    
   
## Discription 
${answers.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)



## Installation
${answers.Installation}
     

## Usage
${answers.Usage}


## Contributing
${answers.Contributing}


## Tests
${answers.Tests}



## Questions

github username:${ answers.Github}        

link: https://github.com/${answers.Github}
    



Email: ${answers.Github} 

Please press "send email" to send me any questions. <a href="mailto:${answers.Github}">Send Email</a>
    
    

## License
Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the ${answers.License} license.

 `;
}

promptUser()
    .then(function (answers) {
        const md = generateMD(answers);
        return writeFileAsync("README.md", md);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });

