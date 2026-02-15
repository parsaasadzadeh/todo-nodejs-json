const Todo = require("../model/Todo");

exports.getTodosPage = async (req, res, next) => {
    try {
        const todos = await Todo.fetchAll();
        const stats = await Todo.getStats();

        res.render("index", {
            pageTitle: "Task Manager Pro",
            todos: todos,
            completedTodos: stats.completed,
            totalTasks: stats.total
        });
    } catch (err) {
        console.error("Error fetching todos:", err);
        next(err); // ارجاع ارور به میدلور مرکزی
    }
};

exports.createTodo = async (req, res) => {
    try {
        const { todoText } = req.body;
        if (!todoText || todoText.trim() === '') {
            return res.redirect("/");
        }

        const newTodo = new Todo(todoText.trim());
        await newTodo.save();
        res.redirect("/");
    } catch (err) {
        console.error("Error creating todo:", err);
        res.redirect("/");
    }
};

exports.completeTodo = async (req, res) => {
    try {
        await Todo.markAsCompleted(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error("Error completing todo:", err);
        res.redirect("/");
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.deleteById(req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error("Error deleting todo:", err);
        res.redirect("/");
    }
};