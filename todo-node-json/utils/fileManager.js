const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "..", "data", "todos.json");

exports.readData = async () => {
    try {
        const data = await fs.readFile(dataPath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

exports.writeData = async (data) => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing to file:", error);
        throw error;
    }
};