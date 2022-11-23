import * as inquirer from "inquirer";
let myBoolean = true;
let myNumber = 1234;
let myStringArray = [`first`, `second`, `third`];
myBoolean = myNumber === 456;
myStringArray = [myNumber.toString(), "5678"];
myNumber = myStringArray.length;
console.log(`myBoolean = ${myBoolean}`);
console.log(`myStringArray = ${myStringArray}`);
console.log(`myNumber = ${myNumber}`);
const prompt = inquirer.createPromptModule();
prompt([
    {
        name: "first_name",
        message: "What is your first name?",
    },
]).then((answers) => {
    console.log(`you answered : ${answers.first_name}`);
});
//# sourceMappingURL=hello_typsescript.js.map