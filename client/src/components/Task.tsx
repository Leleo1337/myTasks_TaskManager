import { Calendar, Edit, LucideCircle, LucideCircleCheckBig, MoreVertical, Trash2 } from "lucide-react";
import PriorityFlag from "./PriorityFlag";
import clsx from "clsx";
import CustomFlag from "./CustomFlag";
import type { taskProps } from "../types/tasksTypes";
import { useEffect, useRef } from "react";

export default function Task({
  title,
  description,
  priority,
  tags,
  date,
  toggleComplete,
  completed,
  toggleSettings,
  menuOpen,
  toggleEditForm,
  deleteTask,
  onCloseMenu,
}: taskProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutsideMenu(event: Event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onCloseMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
  }, []);

  return (
    <>
      <div
        className={clsx(
          `w-full border-l-5 ${
            completed ? "border-green-400" : "border-gray-300"
          } bg-white rounded-xl shadow-sm hover:shadow-md transition-all ease duration-200`
        )}>
        <div className="flex gap-4 p-4">
          <div>
            <button onClick={toggleComplete} className="rounded-full mt-0.5 cursor-pointer">
              {completed ? (
                <LucideCircleCheckBig size={20} color="#05df72" />
              ) : (
                <LucideCircle size={20} color="#99a1af" />
              )}
            </button>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex gap-2 mb-2 flex-wrap">
              <h3 className={clsx(`font-semibold ${completed ? "line-through text-gray-600" : "text-black"}`)}>
                {title}
              </h3>
              <PriorityFlag type={priority} />
            </div>
            <div className={clsx(`text-sm pb-4 ${completed ? "text-gray-400" : "text-gray-600"}`)}>{description}</div>
            <div className="flex items-center gap-2 flex-wrap">
              {date && (
                <div className="flex items-center gap-1 text-red-700">
                  <Calendar size={15} />
                  <span className="text-xs">{date}</span>
                </div>
              )}
              {tags &&
                tags.map((tag, index) => (
                  <CustomFlag key={index} text={tag.text} color={tag.color} size="small" allowDelete={false} />
                ))}
            </div>
          </div>
          <div className="relative">
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={toggleSettings}
              className="absolute right-4 sm:right-0 hover:bg-gray-100 rounded-full p-1 cursor-pointer">
              <MoreVertical size={18} className="text-black" />
            </button>
            {menuOpen && (
              <div
                ref={dropdownRef}
                className="absolute z-50 right-0 top-6 w-36 bg-white shadow-md ring ring-gray-400/20 rounded-md">
                <button
                  onClick={() => {
                    toggleEditForm();
                    onCloseMenu();
                  }}
                  className="w-full p-3 flex items-center gap-1 text-blue-500 text-sm cursor-pointer hover:bg-gray-50">
                  <Edit size={18} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    deleteTask();
                    onCloseMenu();
                  }}
                  className="flex items-center gap-1 w-full p-3 text-red-500 text-sm hover:bg-gray-50 cursor-pointer">
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
