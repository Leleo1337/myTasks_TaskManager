import { CheckSquare, CircleX, Filter, PlusCircle, Search, SquareCheckBig } from "lucide-react";
import Task from "../components/Task";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import type { taskProps } from "../types/tasksTypes";
import { deleteTask, getTasks, getTasksStats, updateTask } from "../services/tasksServices";
import FiltersTab from "../components/FiltersTab";

export default function Home() {
  const [tasks, setTasks] = useState<taskProps[]>([]);
  const [taskMenuOpen, setOpenTaskMenu] = useState<string>("");
  const [filtersTabActive, setfiltersTabActive] = useState<boolean>(false);
  const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState<string>(""); // GUARDA O ID DA TASK
  const [taskToEdit, setTaskToEdit] = useState<taskProps>();
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, remaining: 0 });
  const [hasFailedToConnect, setHasFailedToConnect] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "all", priority: "all" });

  async function fetchTasks(query?: string | { status: string; priority: string }) {
    try {
      const response = await getTasks(query);
      setTasks(response.tasks);
    } catch (error: any) {
      toast.error("Connection to database failed!");
      console.log(error)
      setHasFailedToConnect(true);
    }
  }

  async function handleCompleteTask(id: string) {
    const task = tasks?.find((task) => task._id == id);
    if (!task) return;

    const updated = { ...task, completed: !task?.completed };

    try {
      await updateTask(id, updated);
      await fetchTasks();
      await fetchTaskStats();
    } catch (error: any) {
      toast.error(error.data);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);
      toast.success("Deleted task");
      fetchTasks();
    } catch (error: any) {
      toast.error(error.data);
    }
  }

  function taskSubmitMessage(message: string) {
    toast.success(message);
    setOpenCreateForm(false);
    setOpenEditForm("");
    fetchTasks();
  }

  async function fetchTaskStats() {
    try {
      const response = await getTasksStats();
      setTaskStats({
        completed: response.data.completed,
        remaining: response.data.remaining,
        total: response.data.total,
      });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchTasks(filters.search);
  }, [filters.search]);

  useEffect(() => {
    fetchTaskStats();
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters]);

  return (
    <>
      <ToastContainer />
      {openCreateForm && (
        <TaskForm
          method="create"
          onCancel={() => setOpenCreateForm(false)}
          onSubmitSuccess={() => taskSubmitMessage("Task created!")}
        />
      )}
      {openEditForm && (
        <TaskForm
          task={taskToEdit}
          method="edit"
          onCancel={() => setOpenEditForm("")}
          onSubmitSuccess={() => taskSubmitMessage("Task updated!")}
        />
      )}
      <div className="w-full">
        <header className="flex items-center justify-between max-w-[772px] mx-auto p-4 pb-6 ">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-lg">
              <CheckSquare size={20} />
            </div>
            <h1 className="font-bold text-xl">myTasks</h1>
          </div>
          <div className="space-y-1">
            <div className="flex gap-1.5 items-center text-sm">
              <span className="font-semibold text-gray-500 w-30">{taskStats.completed} completed</span>
              <span className="flex items-center justify-center bg-blue-600/20 font-semibold text-blue-800 rounded-full px-1 w-4 text-xs">
                {taskStats.total}
              </span>
            </div>
            <div className="w-full bg-gray-300 h-1 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all ease duration-75"
                style={{ width: `${(taskStats.completed / taskStats.total) * 100}%` }}></div>
            </div>
          </div>
        </header>
        <main className="max-w-[772px] mx-auto p-4 ">
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-2xl">Tasks</h2>
                <span className="bg-blue-600/20 text-blue-800 h-5 rounded-full px-2.5 text-sm">{taskStats.total}</span>
              </div>
              <button
                onClick={() => setOpenCreateForm(!openCreateForm)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-md font-semibold text-white text-sm cursor-pointer transition-colors ease-in duration-75">
                <PlusCircle size={20} /> Add Task
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4 space-y-3 sm:space-y-0">
              <div className="relative flex items-center w-full bg-white border border-gray-300 rounded-md">
                <label htmlFor="text" className="absolute left-5 top-1/2 -translate-1/2 text-gray-500">
                  <Search size={18} />
                </label>
                <input
                  type="text"
                  id="text"
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  value={filters.search}
                  placeholder="Search tasks..."
                  autoComplete="off"
                  className="w-full pl-10 py-2 outline-none focus:ring ring-blue-500 rounded-md"
                />
              </div>
              <button
                onClick={() => setfiltersTabActive(!filtersTabActive)}
                className="flex gap-2.5 w-full sm:w-30 sm:justify-center items-center bg-white hover:bg-gray-50 border border-gray-300 font-semibold text-gray-700 text-sm rounded-md p-2 pl-3 box-border cursor-pointer transition-colors ease-in duration-75">
                <Filter size={18} /> Filters
              </button>
            </div>
            <div className="pt-4">{filtersTabActive && <FiltersTab filters={filters} setFilters={setFilters} />}</div>
          </section>
          <section>
            <div className="space-y-4">
              {hasFailedToConnect && (
                <>
                  <div className="flex flex-col items-center justify-center gap-6 h-70">
                    <span className="text-2xl font-semibold text-gray-400 text-center">
                      Something went wrong with database, try again later!
                    </span>
                    <CircleX size={130} className="text-gray-200" />
                  </div>
                </>
              )}
              {tasks?.length == 0 && !hasFailedToConnect && (
                <div className="flex flex-col items-center justify-center gap-16 h-70">
                  <span className="font-semibold text-gray-400 text-center">
                    You have no items in you Task List click
                    <span
                      onClick={() => setOpenCreateForm(true)}
                      className="text-blue-500 text-lg px-1 underline cursor-pointer">
                      Here
                    </span>
                    to create a task
                  </span>
                  <SquareCheckBig size={130} className="text-gray-200" />
                </div>
              )}
              {tasks != null &&
                tasks.map((task) => (
                  <Task
                    key={task._id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    date={task.date}
                    tags={task.tags}
                    menuOpen={taskMenuOpen === task._id}
                    completed={task.completed}
                    deleteTask={() => handleDeleteTask(task._id!)}
                    toggleComplete={() => handleCompleteTask(task._id!)}
                    toggleSettings={() => setOpenTaskMenu(task._id!)}
                    toggleEditForm={() => {
                      setOpenEditForm(task._id!);
                      setTaskToEdit(task);
                    }}
                    onCloseMenu={() => setOpenTaskMenu("")}
                  />
                ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
