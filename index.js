#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
const apiLink = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        name: "askName",
        type: "input",
        message: "What is your name?"
    });
    for (let i = 0; i < 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.blueBright("Correct"));
        }
        else {
            console.log(`correct answer is ${chalk.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.askName)}, yuor score is ${chalk.redBright(score)} out of${chalk.red(" 5 ")}`);
};
startQuiz();
