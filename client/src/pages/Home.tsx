import { CheckSquare, Filter, PlusCircle, Search } from "lucide-react";
import Task from "../components/Task";
import { useState } from "react";
import TaskForm from "../components/TaskForm";

export default function Home() {
   const [check, setCheck] = useState<boolean>(false);
   const [menuOpen, setMenuOpen] = useState<boolean>(false);
   const [filtersTabActive, setfiltersTabActive] = useState<boolean>(false);
   const [openCreateTaskForm, toggleCreateOpenTaskForm] = useState<boolean>(false);
   const [openEditForm, toggleOpenEditForm] = useState<boolean>(false);

   function addTask() {
      toggleCreateOpenTaskForm(!openCreateTaskForm);
   }

   function handleToggleCheck() {
      setCheck(!check);
   }

   function handleToggleSettings() {
      setMenuOpen(!menuOpen);
   }

   function handleToggleFilterTab() {
      setfiltersTabActive(!filtersTabActive);
   }

   function handleEditForm() {
      toggleOpenEditForm(!openEditForm);
   }

   return (
      <>
         {openCreateTaskForm && (
            <TaskForm method="Create task" closeForm={() => toggleCreateOpenTaskForm(!openCreateTaskForm)} />
         )}
         {openEditForm && <TaskForm method="Edit task" closeForm={() => toggleOpenEditForm(!openEditForm)} />}
         <div className="w-full h-screen bg-gray-50">
            <header className="flex items-center justify-between max-w-[772px] mx-auto p-4 pb-6 ">
               <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2.5 rounded-lg">
                     <CheckSquare size={20} />
                  </div>
                  <h1 className="font-bold text-xl">myTask</h1>
               </div>
               <div className="space-y-1">
                  <div className="flex gap-1.5 items-center text-sm">
                     <span className="font-semibold text-gray-500">1/2 completed</span>
                     <span className="bg-blue-600/20 text-blue-800 rounded-full px-1">50%</span>
                  </div>
                  <div className="w-full bg-gray-300 h-1 rounded-full">
                     <div className="h-full bg-blue-600 rounded-full" style={{ width: "50%" }}></div>
                  </div>
               </div>
            </header>
            <main className="max-w-[772px] mx-auto p-4 ">
               <section>
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <h2 className="font-bold text-2xl">Tasks</h2>
                        <span className="bg-blue-600/20 text-blue-800 h-5 rounded-full px-2.5 text-sm">0</span>
                     </div>
                     <button
                        onClick={addTask}
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
                           className="w-full pl-10 py-2 outline-none focus:ring ring-blue-500 rounded-md"
                        />
                     </div>
                     <button
                        onClick={handleToggleFilterTab}
                        className="flex gap-2.5 w-full sm:w-30 sm:justify-center items-center bg-white hover:bg-gray-50 border border-gray-300 font-semibold text-gray-700 text-sm rounded-md p-2 pl-3 box-border cursor-pointer transition-colors ease-in duration-75">
                        <Filter size={18} /> Filters
                     </button>
                  </div>
               </section>
               <section className="pt-6">
                  <div>
                     {filtersTabActive && (
                        <div className="bg-gray-100 border border-gray-100 mb-8">
                           <p>QUE PREGUIÇA FAZER ISSO</p>
                        </div>
                     )}
                  </div>
                  <div>
                     <Task
                        toggleCheck={handleToggleCheck}
                        toggleSettings={handleToggleSettings}
                        toggleEditForm={handleEditForm}
                        checked={check}
                        menuOpen={menuOpen}
                     />
                  </div>
               </section>
            </main>
         </div>
      </>
   );
}
