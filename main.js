var os = require('os');
var colors = require('colors');
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

logo()
value_Output()