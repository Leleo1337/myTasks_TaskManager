export function getAllTasks(req, res) {
   res.json("hello world");
}

export function getTask(req, res) {
   res.json({id: req.params.id});
}

export function createTask(req, res) {
   res.json(req.body)
}

export function updateTask(req, res) {
   res.json({id: req.params.id});
}
export function deleteTask(req, res) {
   res.json({id: req.params.id});
}
