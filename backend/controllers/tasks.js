import Task from "../models/task.js";

export async function getAllTasks(req, res) {
   try {
      const tasks = await Task.find({});
      res.status(200).json({ success: true, tasks });
   } catch (error) {
      res.status(500).json({ msg: error });
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
   const { name, completed } = req.body;
   try {
      const task = await Task.create({ name, completed });
      if(!name || name.length == 0){
         return res.status(400).json({msg: `you must insert a name`})
      }
      res.status(201).json({ success: true, task });
   } catch (error) {
      res.status(500).json({ msg: error });
   }
}

export async function updateTask(req, res) {
   const { id: taskID } = req.params;
   const { name, completed } = req.body;
   
   try {
      const task = await Task.findByIdAndUpdate(taskID, { name, completed }, {new: true, runValidators: true});

      if(!task){
         return res.status(404).json({msg: `no task with id: ${taskID} found`})
      }
      res.status(200).json({ success: true, task});
   } catch (error) {
      res.status(500).json({ msg: error });
   }
}
export async function deleteTask(req, res) {
   const { id: taskID } = req.params;

   try {
      const task = await Task.findByIdAndDelete(taskID)
      if(!task){
         return res.status(404).json({msg: `no task with id: ${taskID} found`})
      }
      res.status(200).json({ success: true, task });
   } catch (error) {
      res.status(500).json({ msg: error });
   }
}
