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
            name: "Questions",
            message: "any questions?"
        },
        {
            type: "input",
            name: "License",
            message: "what license would you like to add?"
        }
    ]);
}

function generateHTML(answers) {
    return `

# ${answers.Title}
    
   
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
${answers.Questions}


## License
${answers.License}

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

