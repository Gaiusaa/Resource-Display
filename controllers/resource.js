const pidusage = require("pidusage");
const {logs} = require("../models/logs");

const running = true
let debounce = false
let cooldown = 1 * 1000 // Seconds
let resources = {
    CPU: 0,
    RAM: 0,
    TIME: 0,
};

// Internal Function
const getResources = async () => {
    pidusage(process.pid, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }
        resources.CPU = stats.cpu.toFixed(2);
        resources.RAM = (stats.memory / 1024 / 1024).toFixed(2);
        resources.TIME = Date.now();
    });

    try {
        const logId = `${resources.CPU.toString().split("", 1)}${Math.floor(Math.random() * 100000)}${resources.RAM.toString().split("", 1)}`;
        console.log(logId)
        const logged = await logs.create({
            id: logId,
            cpu: resources.CPU,
            ram: resources.RAM,
            date: resources.TIME,
        });

    } catch(error) {
        console.log(`An error occurred creating log: ${error}`);
    };
};

// Exposed Function
const showResource = () => {
    return resources;
};

const getLogs = async () => {
    try {
        const returnedLogs = await logs.find();
        return returnedLogs;
    } catch (error) {
        console.log(`An error occurred while retriving logs: ${error}`);
    };
};

run();
async function run() {
    while (running === true) {
        if (debounce === false) {
            debounce = true;
            getResources();
            
            await new Promise(resolve => setTimeout(resolve, 30000));
            debounce = false;
        }

        await new Promise(resolve => setTimeout(resolve, 0));
    }
}

module.exports = {
    showResource,
    getLogs,
};