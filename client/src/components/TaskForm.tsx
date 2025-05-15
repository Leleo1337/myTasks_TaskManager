import { X } from "lucide-react";
import type { taskFormProps } from "../types/tasksTypes";

export default function TaskForm({ method, closeForm }: taskFormProps) {
   return (
      <div className="fixed z-50 w-full h-screen bg-black/40 backdrop-blur-xs">
         <div className="absolute z-10 top-2/5 left-1/2 -translate-1/2 bg-white w-[90%] max-w-[500px] rounded-md">
            <div className="flex justify-between border-b border-gray-300 p-4 py-6">
               <h1 className="text-xl">{method}</h1>
               <X onClick={closeForm} className="transition ease duration-300 hover:scale-110 cursor-pointer" />
            </div>
            <div>
               <div className="p-4">
                  <form method="POST" className="flex flex-col gap-4">
                     <div className="flex flex-col">
                        <label htmlFor="taskTitle" className="text-gray-500 text-sm pb-1">
                           Task Title
                        </label>
                        <input
                           type="text"
                           name="title"
                           id="taskTitle"
                           placeholder="Enter task title"
                           className="w-full py-2 px-4 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md"
                        />
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="description" className="text-gray-500 text-sm pb-1">
                           Description
                        </label>
                        <textarea
                           name="description"
                           id="description"
                           placeholder="Enter task description"
                           className="w-full py-2 px-4 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md"></textarea>
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="priority" className="text-gray-500 text-sm pb-1">
                           Priority
                        </label>
                        <select
                           name="priority"
                           id="priority"
                           className="w-full py-2 px-4 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md">
                           <option value="Low" selected>
                              Low
                           </option>
                           <option value="Medium">Medium</option>
                           <option value="High">High</option>
                        </select>
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="tags" className="text-gray-500 text-sm pb-1">
                           Tags
                        </label>
                        <div className="relative flex flex-row gap-4">
                           <input
                              type="text"
                              name="tagsText"
                              id="tags"
                              placeholder="Add a tag"
                              className="w-full py-1.5 px-3 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md pr-26"
                           />
                           <button className="absolute -right-1  bg-blue-600 h-[38px] px-4 rounded-tl-xl rounded-bl-xl rounded-tr-md rounded-br-md text-white hover:bg-blue-700 cursor-pointer">
                              Add a tag
                           </button>
                        </div>
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="date" className="text-gray-500 text-sm pb-1">
                           Due date
                        </label>
                        <input
                           type="date"
                           name="date"
                           id="data"
                           className="w-full py-1.5 px-3 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md"
                        />
                     </div>
                     <div className="flex justify-end gap-4">
                        <button
                           onClick={closeForm}
                           className="border border-gray-300 text-gray-500 rounded-md px-3 py-1.5 font-semibold text-sm hover:bg-gray-50 cursor-pointer">
                           Cancel
                        </button>
                        <button className="bg-blue-600 px-3 py-1.5 text-white font-semibold rounded-md text-sm hover:bg-blue-700 cursor-pointer">
                           {method}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
