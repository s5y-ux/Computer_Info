const os = require('os');
const colors = require('colors');
const prompt = require('prompt-sync')();

colors.enable();
function logo(){
	console.log("\n=========================================".green);
	console.log("Program Made By Joseph R. Shumaker".green);
	console.log("https://github.com/s5y-ux".green);
	console.log("=========================================\n".green);
}

function paring(text, command){
	console.log(text.brightGreen+":", command.toString().brightWhite);
}

function value_Output(){
	var all_values = {"CPU Architecture": os.arch(), "CPU Count": os.cpus().length,
	"Free Memory": Math.round(os.freemem()/Math.pow(1024, 3)).toString() + "GB", 
	"Total Memory": Math.round(os.totalmem()/Math.pow(1024, 3)).toString() + "GB",
	"Hostname": os.hostname(), "Current User": os.userInfo()["username"],
	"Operating System": os.platform()};

	for (iteration in all_values){
		paring(iteration, all_values[iteration]);
	}

	console.log("\n");
	console.log("For more options, please use -help");
	console.log("\n");
}

/*function network_Selection(parameter){
	const response = prompt("IPv4 Only? >: ");
	var interfaces = Object.keys(os.networkInterfaces());
	var selection = os.networkInterfaces()[interfaces[parameter-1]];
	if(response.toLowerCase() == "yes" || response.toLowerCase() == "y"){
		console.log("\n(*)(*)(*)(*)(*)".brightYellow);
		for (let dicts in selection){
			if(selection[dicts]['family'] == 'IPv4'){
				for(let values in selection[dicts]){
					paring(values, selection[dicts][values]);
				}
			}
		}
		console.log("(*)(*)(*)(*)(*)\n".brightYellow);
	} else {
		for (let dicts in selection){
			console.log("\n(*)(*)(*)(*)(*)".brightYellow);
				for(let values in selection[dicts]){
					paring(values, selection[dicts][values]);
				}
				console.log("(*)(*)(*)(*)(*)\n".brightYellow);
			
		}
	}
}

function network_Enum(){
	var interfaces = Object.keys(os.networkInterfaces());
	console.log("\n");
	for (let index = 0; index < interfaces.length; index++){
		console.log(`Option ${index+1}: `.red + `${interfaces[index]}`.brightWhite);
	} 

	console.log("\n");
	const response = prompt("Selection >: ");
	network_Selection(response);
}*/


/*logo()
value_Output()*/

function printNetworkInterfaces(interfaces) {
    console.log("\n");
    for (let index = 0; index < interfaces.length; index++) {
        console.log(`Option ${index + 1}: `.red + `${interfaces[index]}`.brightWhite);
    }
    console.log("\n");
}

function printInterfaceDetails(interfaceDetails) {
    console.log("\n(*)(*)(*)(*)(*)".brightYellow);
    for (let values in interfaceDetails) {
        paring(values, interfaceDetails[values]);
    }
    console.log("(*)(*)(*)(*)(*)\n".brightYellow);
}

function networkSelection(parameter) {
    const response = prompt("IPv4 Only? >: ").toLowerCase();
    const interfaces = Object.keys(os.networkInterfaces());
    const selection = os.networkInterfaces()[interfaces[parameter - 1]];

    if (response === "yes" || response === "y") {
        printInterfaceDetails(
            selection.filter(details => details.family === 'IPv4')[0]
        );
    } else {
        for (let details of selection) {
            printInterfaceDetails(details);
        }
    }
}

function networkEnum() {
    const interfaces = Object.keys(os.networkInterfaces());
    printNetworkInterfaces(interfaces);

    const response = prompt("Selection >: ");
    networkSelection(response);
}

networkEnum();