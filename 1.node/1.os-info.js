const os = require('node:os');

console.log('OS Name', os.platform());
console.log('OS Version', os.release());
console.log('Architecture', os.arch());
console.log('Cpu', os.cpus());
console.log('Free Mem', os.freemem() / 1024 / 1024);
console.log('Total Mem', os.totalmem() / 1024 / 1024);
console.log('uptime', os.uptime() / 60 / 60);
