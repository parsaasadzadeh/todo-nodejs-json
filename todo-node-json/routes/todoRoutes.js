const express = require("express");
const todoController = require("../controller/todoController");

const router = express.Router();

router.get("/", todoController.getTodosPage);
router.post("/add", todoController.createTodo);
router.post("/complete/:id", todoController.completeTodo);
router.post("/delete/:id", todoController.deleteTodo);

module.exports = router;