const resourceController = require("./resource");

const renderPage = async (req, res) => {
    const resources = await resourceController.showResource();
    const logs = await resourceController.getLogs();
    const package = {
        CPU: resources.CPU,
        RAM: resources.RAM,
        DISK: resources.DISK,
        LOGS: logs,
    };
    console.log(package)
    res.render("page", package);
};

module.exports = {
    renderPage,
};