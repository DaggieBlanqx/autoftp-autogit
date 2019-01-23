"use strict"

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require('fs');

const removeWWWaddFTP = (wwwURL) => `ftp://${wwwURL.split("www.")[1]}`;


const init = () => {
  console.log(
    chalk.green(
      figlet.textSync(`
        this is 
        AutoFTP - AutoGIT 
        by 
        Daggie Blanqx 
        \n\t
        \n
        www . blanqx . com
        ______________`, {
        font: "",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
}

const askQuestions = () => {
  const questions = [{

      type: "input",
      name: "FTPSERVER",
      message: "What is the url of the server you want to push files to  \n (enter the following format www.example.com ) ?"
    },
    {

      type: "input",
      name: "USERNAME",
      message: "What is the FTP username of the server you want to push files to?"
    },
    {

      type: "input",
      name: "PASSWORD",
      message: "What is the FTP password of the server you want to push files to?"
    },
    {
      type: "list",
      name: "PORT",
      message: "What is the port of the server \n(select 21 if you are not sure)?",
      choices: ["21", "22"],
      filter: function (val) {
        return val;
      }
    },
    {

      type: "input",
      name: "IGNOREFILES",
      message: "What are the files you want not to upload (enter ./filename.php ./config/main.php)?"
    }
  ];
  return inquirer.prompt(questions);
};


const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath);
  return filePath;
};

const success = (filepath) => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  );
};


const warning = (filepath) => {
  console.log(
    chalk.white.bgRed.bold(`Error! File NOT CREATED at ${filepath}`)
  );
};


const writeToFile = (filePath, data) => {
  console.log(filePath);
  filePath = filePath;
  fs.writeFile(filePath, data, function (err, data) {
    if (err) {
      warning(filePath);
    } else {
      success(filePath);
    }

  });

}


const run = async() => {
  // show script introduction
  init();

  // ask questions
  const answers = await askQuestions();
  const {
    FTPSERVER,
    USERNAME,
    PASSWORD,
    PORT
  } = answers;

  const dotenvify = `host = ${removeWWWaddFTP(FTPSERVER)}\nport = ${PORT}\nuser = ${USERNAME}\npassword = ${PASSWORD}\nisConfigured = true`;

  writeToFile(createFile('', 'env'), dotenvify)

};


run();