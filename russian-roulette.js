console.log("Welcome to russian roulette!");
// console.log("To use this program please install Node.js and the readlineSync npm package.");
// console.log("You'll know that you've done it correctly when no error shows up.");

const fs = require("fs"); 
const readlineSync = require("readline-sync");

console.log("When you're ready press any key to continue");
readlineSync.keyIn("");

let file = readlineSync.question("Enter file path: (DO NOT INCLUDE QUOTATION MARKS)");
if (!fs.existsSync(file)){
    throw file + " doesn't exist";
}

console.log("The way this works is that a number between 0 and 100 will be chosen.");
console.log("If that number is over 50, the file will be deleted.");
console.log("Otherwise, the message 'You got lucky' will display and nothing will happen.");
let changeChance = readlineSync.question("Would you like to modify the chances? Y/N", {limit: ['Y', 'N']});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Default values for above function
let mini = 0; 
let maxi = 100;
let threshold = 50;

if (changeChance == "Y"){
    while (true){
        console.log("First you'll set the range.");

        mini = readlineSync.question("What's the minimum?", {limit: function(input){return Number.isInteger(Number(input));}, limitMessage: "Please input an integer."});
        maxi = readlineSync.question("What's the maximum?", {limit: function(input){return Number.isInteger(Number(input)) && (Math.floor(input) > mini);}, limitMessage: "Please input an integer that's greater than the minimum."});

        console.log("Next you'll set the threshold.");
        console.log("As mentioned earlier, the number picked must be GREATER than the threshold");

        threshold = readlineSync.question("What's the threshold?",{limit: function(input){return Number.isInteger(Number(input)) && (Math.floor(input) >= mini && Math.floor(input) < maxi);}, limitMessage: "Please input an integer that's between the min and max. (The integer can be equal to the min)"});

        // used to determine if the user wants to repeat the process
        let loop = readlineSync.question("You want you're file to be deleted when a number between " + mini + " and " + maxi + " is above " + threshold + "? (Y/N)", {limit: ["Y", "N"]});

        if (loop == "N"){
            console.log("I'm guessing you made a mistake so let's try again.");
            continue;
        }
        else{
            break;
        }
    }
}

let random = getRndInteger(Math.floor(mini), Math.floor(maxi));
console.log(random); 

if (random > threshold){
    // fs.unlink will perma-delete your file off the OS
    fs.unlink(file, (err) => {
        if (err) {throw err};
        console.log(file + ' was deleted');
    }); 
}
else {
    console.log("You got lucky");
}
