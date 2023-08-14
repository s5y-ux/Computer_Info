/*
Created by Joseph R. Shumaker
Date: 08 / 12 / 2023

This script was created in order to probe system information
in a really high level and easy way. I'm sick of having to do different
things in order to get all the information I'd like in one place.

This software is free and open source, feel free to deface, modify, use,
and distribute as you please.
*/

//Used to reference Version Information
var version_info = "V1.0.1";

//Node library used for probing OS information
var os = require('os');

//Node Library used for colors
var colors = require('colors');
colors.enable();

//Library for reading user input
const prompt = require('prompt-sync')();

//Function used to display the banner without any arguments
function logo() {
	console.log("\n=========================================".green);
	console.log("Program Made By Joseph R. Shumaker".green);
	console.log("https://github.com/s5y-ux".green);
	console.log("=========================================\n".green);
}

//Function used to decorate information
//Currently in the format "Name of info: Actual info"
function paring(text, command) {
	console.log(text.brightGreen + ":", command.toString().brightWhite);
}

//The default information for displaying basic information without arguments
function value_Output() {
	var all_values = {
		"CPU Architecture": os.arch(),
		"CPU Core Count": os.cpus().length,
		"Free Memory": Math.round(os.freemem() / Math.pow(1024, 3)).toString() + "GB",
		"Total Memory": Math.round(os.totalmem() / Math.pow(1024, 3)).toString() + "GB",
		"Host-name": os.hostname(),
		"Current User": os.userInfo()["username"],
		"Operating System": os.platform()
	};

	//Enumerates over the dictionary and prints the information
	for (iteration in all_values) {
		paring(iteration, all_values[iteration]);
	}

	//Telling the user to use arguments
	console.log("\n");
	console.log("For more usage, please use -help");
	console.log("\n");
}

//Formats the command information when help is prompted
// *Tab* command *Tab* information about the command
function command_format(command, info) {
	console.log("\t" + command + "\t" + info);
}

//Lists all of the arguments for the program
function help_command() {
	console.log("\nGeneral arguments\n");
	command_format("-help", "Lists all of the commands in the module");
	command_format("-version", "Lists the current version of the software");
	command_format("-github", "Displays github account of the creator");

	//I was going to add a CPU extension but decided on one command
	console.log("\nProgram Usage\n");
	command_format("-cpu", "General command for CPU info and usage");

	//Network information
	console.log("\nNetwork Information\n");
	command_format("-network", "General command for network interface info and usage");
}

//Function called for monitoring different CPU cores
function monitorCPUCore(core) {

	//Tells you what core is being monitored
    console.log("\n");
    paring("CPU Model", os.cpus()[0].model);
    paring("CPU Core Count", os.cpus().length);
    console.log("\n");
    console.log(`Monitoring Core ${core}`.brightRed);
    
    //Reference object for different times at specific core
    const referenceObj = os.cpus()[core - 1].times;
    console.log("=======================");
    
    //Formats the keys and values for the program user
    for (const key in referenceObj) {
        console.log(`${capitalize(key)} Mode: `.red + `${referenceObj[key]}`);
    }
    
    //Lets us know how to navigate the monitoring mode.
    //Please note that I will be adding CLI graphs
    console.log("=======================\n");
    console.log("Use the Arrow Keys to navigate cores.");
    console.log("Press 'q' to quit...\n");
}

//Logic check for making sure the name is capitalized
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//function for network information in the -network option
function printNetworkInterfaces(interfaces) {
    console.log("\n");

    //Gives us the different network interfaces of the computer
    for (let index = 0; index < interfaces.length; index++) {
        console.log(`Option ${index + 1}: `.red + `${interfaces[index]}`.brightWhite);
    }
    console.log("\n");
}

//This is the way that we format the network interface for program output
function printInterfaceDetails(interfaceDetails) {
    console.log("\n(*)(*)(*)(*)(*)".brightYellow);

    //Interface details is a parameter for the dictionary output of the os.networkInterfaces() method
    for (let values in interfaceDetails) {
        paring(values, interfaceDetails[values]);
    }
    console.log("(*)(*)(*)(*)(*)\n".brightYellow);
}

//This is the network selection. This enumerates the information for selected interface.
function networkSelection(parameter) {

	//Prompts the user to see if they only want IPv4 information
    const response = prompt("IPv4 Only? >: ").toLowerCase();

    //Sets a variable to be referenced to for network interfaces for selection as array
    const interfaces = Object.keys(os.networkInterfaces());

    //The actual selection data of the interfaces keys array
    const selection = os.networkInterfaces()[interfaces[parameter - 1]];

    //Evaluates the prompt to see if user only wants IPv4
    if (response === "yes" || response === "y") {

    	//Quick and easy way to check if IPv4 and log elements
        printInterfaceDetails(
            selection.filter(details => details.family === 'IPv4')[0]
        );

        //Otherwise, we will just log all of the details
    } else {
        for (let details of selection) {
            printInterfaceDetails(details);
        }
    }
}

//The main network interface function.
function networkEnum() {

	//Prints our network interfaces in the designated format
    const interfaces = Object.keys(os.networkInterfaces());
    printNetworkInterfaces(interfaces);

    //Allows for our response on what interface we want
    const response = prompt("Selection >: ");
    networkSelection(response);
}

//Used for program arguments. (Called in the terminal)
var args = (process.argv.slice(2));
switch (args[0]) {
	case "-help":
		help_command();
		break;
	case "-cpu":
		monitorCPUCore(1);
		break;
	case "-network":
		networkEnum();
		break;
	default:
		logo();
		value_Output();

}