import { CheckSquare, Filter, PlusCircle, Search, SquareCheckBig } from "lucide-react";
import Task from "../components/Task";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import type { taskProps } from "../types/tasksTypes";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import FiltersTab from "../components/FiltersTab";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
   const [openCreateTaskForm, toggleCreateOpenTaskForm] = useState<boolean>(false);
   const [menuOpen, setMenuOpen] = useState<string | null | undefined>("");
   const [openEditForm, toggleOpenEditForm] = useState<string | null | undefined>("");
   const [filtersTabActive, setfiltersTabActive] = useState<boolean>(false);
   const [tasks, setTasks] = useState<taskProps[]>([]);

   const tasksStatus = {
      taskLength: tasks?.length,
      completed: tasks?.filter((task) => task.completed === true).length,
   };
   const percentage = tasksStatus.taskLength === 0 ? 0 : (tasksStatus.completed / tasksStatus.taskLength) * 100;

   const taskQuantity = {
      all: tasks.length,
      low: tasks.filter((task) => task.priority === "Low").length,
      medium: tasks.filter((task) => task.priority === "Medium").length,
      high: tasks.filter((task) => task.priority === "High").length,
      completed: tasks.filter((task) => task.completed === true).length,
      uncompleted: tasksStatus.taskLength - tasksStatus.completed,
   };

   function getTasks() {
      axios
         .get("http://localhost:3000/api/v1/tasks")
         .then(function (response) {
            setTasks(response.data.tasks);
         })
         .catch((e) => console.log(e));
   }

   function getTaskBySearch(query: string) {
      axios.get(`http://localhost:3000/api/v1/tasks/search/`, { params: { title: query } }).then(function (response) {
         setTasks(response.data);
      });
   }

   function deleteTask(taskID: string | undefined) {
      axios.delete(`http://localhost:3000/api/v1/tasks/${taskID}`).then(() => {
         setTasks((prev) => prev?.filter((task) => task._id !== taskID));
      });
   }

   function completeTask(taskID: string | undefined) {
      const task = tasks?.find((task) => task._id === taskID);
      axios.patch(`http://localhost:3000/api/v1/tasks/${taskID}`, { ...task, completed: !task?.completed }).then(() => {
         getTasks();
      });
   }

   function searchTasks(search: string) {
      setTimeout(() => {
         if (search.trim() === "") {
            getTasks();
         }
         getTaskBySearch(search);
      }, 600);
   }

   useEffect(() => {
      getTasks();
   }, []);

   useEffect(() => {
      if (openEditForm || openCreateTaskForm) {
         document.body.style = "overflow: hidden";
      }

      return () => {
         document.body.style = "overflow: auto";
      };
   }, [openEditForm, openCreateTaskForm]);

   return (
      <>
         <ToastContainer />
         {openCreateTaskForm && (
            <TaskForm
               method="Create task"
               onCancel={() => toggleCreateOpenTaskForm(false)}
               onSubmitSuccess={() => {
                  toast.success("Task created succefully");
                  toggleCreateOpenTaskForm(false);
                  axios.get("http://localhost:3000/api/v1/tasks").then((response) => {
                     setTasks(response.data.tasks);
                  });
               }}
            />
         )}
         {openEditForm && (
            <TaskForm
               method="Edit task"
               task={tasks.find((task) => task._id === openEditForm)}
               onCancel={() => toggleOpenEditForm(null)}
               onSubmitSuccess={() => {
                  toast.success("Task edited succefully");
                  toggleOpenEditForm(null);
                  axios.get("http://localhost:3000/api/v1/tasks").then((response) => {
                     setTasks(response.data.tasks);
                  });
                  setMenuOpen(null);
               }}
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
                     <span className="font-semibold text-gray-500 w-30">
                        {`${tasksStatus.completed}/${tasksStatus.taskLength}`} completed
                     </span>
                     <span className="flex items-center justify-center bg-blue-600/20 font-semibold text-blue-800 rounded-full px-1 w-4 text-xs">
                        {tasksStatus.taskLength}
                     </span>
                  </div>
                  <div className="w-full bg-gray-300 h-1 rounded-full">
                     <div
                        className=" h-full bg-blue-600 rounded-full transition-all ease duration-75"
                        style={{ width: `${percentage}%` }}></div>
                  </div>
               </div>
            </header>
            <main className="max-w-[772px] mx-auto p-4 ">
               <section>
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <h2 className="font-bold text-2xl">Tasks</h2>
                        <span className="bg-blue-600/20 text-blue-800 h-5 rounded-full px-2.5 text-sm">
                           {tasksStatus.taskLength}
                        </span>
                     </div>
                     <button
                        onClick={() => toggleCreateOpenTaskForm(!openCreateTaskForm)}
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
                           placeholder="Search tasks..."
                           onChange={(e) => searchTasks(e.target.value)}
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
               </section>
               <section className="pt-6">
                  <div>{filtersTabActive && <FiltersTab quantity={taskQuantity} filter={true} />}</div>
                  <div className="space-y-4">
                     {tasksStatus.taskLength === 0 && (
                        <div className="flex flex-col items-center justify-center gap-16 h-70">
                           <span className="font-semibold text-gray-400 text-center">
                              You have no items in you Task List click{" "}
                              <span
                                 onClick={() => toggleCreateOpenTaskForm(true)}
                                 className="text-blue-500 text-lg px-1 underline cursor-pointer">
                                 Here
                              </span>{" "}
                              to create a task
                           </span>
                           <SquareCheckBig size={130} className="text-gray-200" />
                        </div>
                     )}
                     {tasks &&
                        tasks.map((task) => (
                           <Task
                              key={task._id}
                              title={task.title}
                              description={task.description}
                              priority={task.priority}
                              date={task.date}
                              tags={task.tags}
                              toggleSettings={() => setMenuOpen(menuOpen === task._id ? null : task._id)}
                              toggleComplete={() => completeTask(task._id)}
                              toggleEditForm={() => toggleOpenEditForm(openEditForm === task._id ? null : task._id)}
                              deleteTask={() => deleteTask(task._id)}
                              onCloseMenu={() => setMenuOpen(null)}
                              menuOpen={menuOpen === task._id}
                              completed={task.completed}
                           />
                        ))}
                  </div>
               </section>
            </main>
         </div>
      </>
   );
}
