const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require("../utils/fileManager");

class Todo {
    constructor(text) {
        this.id = uuidv4();
        this.text = text;
        this.completed = false;
        this.createdAt = new Date().toISOString(); 
    }

    async save() {
        const todos = await readData();
        todos.push(this);
        await writeData(todos);
    }

    static async fetchAll() {
        return await readData();
    }

    static async deleteById(id) {
        const todos = await readData();
        const updatedTodos = todos.filter(todo => todo.id !== id);
        await writeData(updatedTodos);
    }

    static async markAsCompleted(id) {
        const todos = await readData();
        const todoIndex = todos.findIndex(todo => todo.id === id);
        
        if (todoIndex > -1) {
            todos[todoIndex].completed = true;
            await writeData(todos);
        }
    }

    static async getStats() {
        const todos = await readData();
        const completedCount = todos.filter(todo => todo.completed).length;
        return {
            total: todos.length,
            completed: completedCount,
            remaining: todos.length - completedCount
        };
    }
}

module.exports = Todo;