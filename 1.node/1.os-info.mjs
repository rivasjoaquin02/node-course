import {
	platform,
	release,
	arch,
	cpus,
	freemem,
	totalmem,
	uptime,
} from "node:os";

console.log("OS Name", platform());
console.log("OS Version", release());
console.log("Architecture", arch());
console.log("Cpu", cpus());
console.log("Free Mem", freemem() / 1024 / 1024);
console.log("Total Mem", totalmem() / 1024 / 1024);
console.log("uptime", uptime() / 60 / 60);
