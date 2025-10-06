import Task from "../models/task.js";

export async function getAllTasks(req, res) {
  const { search } = req.query;
  let tasks;
  try {
    if (search) {
      tasks = await Task.find({ title: { $regex: search, $options: "i" } });
    } else {
      tasks = await Task.find({});
    }
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("ERRO DETALHADO AO BUSCAR TAREFAS:", error);
    res.status(500).json({ success: false, msg: "Ocorreu um erro interno no servidor." });
  }
}

export async function getTask(req, res) {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskID} found` });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

export async function createTask(req, res) {
  const { title, description, priority, completed, tags, date } = req.body;
  if (!title) {
    return res.status(400).json({ msg: "You must provide a title" });
  }
  try {
    const task = await Task.create({ title, description, priority, completed, tags, date });
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

export async function updateTask(req, res) {
  const { id: taskID } = req.params;
  const { title, description, priority, completed, tags, date } = req.body;

  if (!title) {
    return res.status(400).json({ msg: "You must provide a title" });
  }
  try {
    const task = await Task.findByIdAndUpdate(
      taskID,
      { title, description, priority, completed, tags, date },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskID} found` });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

export async function deleteTask(req, res) {
  const { id: taskID } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskID);
    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskID} found` });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}
