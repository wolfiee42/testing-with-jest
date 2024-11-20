// task.service.ts
import express from 'express';
import { Task } from '../schema/task.schema'


const app = express();
app.use(express.json());

// Create Task
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

// Get Tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

// Update Task
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
});

// Delete Task
app.delete("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
});

export const TaskService = app;
