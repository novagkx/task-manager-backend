import express from "express";
import TaskController from "../controller/task.controller.js";
const router = express.Router()

router.post('/tasks', TaskController.createTask);
router.get('/tasks', TaskController.getTasks);
router.put('/tasks', TaskController.updateTask);
router.delete('/tasks/:id', TaskController.deleteTask)

export default router;