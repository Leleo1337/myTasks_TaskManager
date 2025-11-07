import { Palette, X } from "lucide-react";
import type { taskFormProps } from "../types/tasksTypes";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { SketchPicker } from "react-color";
import CustomFlag from "./CustomFlag";
import { v4 } from "uuid";
import { createTask, updateTask } from "../services/tasksServices";

export default function TaskForm({ method, onCancel, onSubmitSuccess, task }: taskFormProps) {
  const [formData, setFormData] = useState({
    id: task?.id || "",
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "LOW",
    tags: task?.tags || [],
    date: task?.date?.slice(0, 10) || "",
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [tagText, setTagText] = useState<string>("");
  const [colorPickerButtonActive, setColorPickerButtonActive] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddTag() {
    if (formData.tags.length >= 10) {
      toast.error("You cant add more than 10 tags");
      return;
    }
    if (tagText === "") {
      toast.error("You should add a name to your tag");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, { id: v4(), text: tagText, color: currentColor }],
    }));
  }

  function deleteFlag(id: string | undefined) {
    const filteredTags = formData.tags.filter((tag) => tag.id !== id);
    setFormData((prev) => ({
      ...prev,
      tags: filteredTags,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      switch (method) {
        case "edit":
          await updateTask(task?.id!, formData);
          break;
        case "create":
          await createTask(formData);
          break;
      }
      onSubmitSuccess();
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  }

  useEffect(() => {
    function handleClickOutSideColorPicker(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setColorPickerButtonActive(false);
        setShowColorPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSideColorPicker);
    return () => document.removeEventListener("mousedown", handleClickOutSideColorPicker);
  }, []);

  return (
    <>
      <div className="fixed z-50 w-full h-screen bg-black/40 backdrop-blur-xs">
        <div className="absolute z-10 top-1/2 left-1/2 -translate-1/2 bg-white w-[90%] max-w-[500px] rounded-md">
          <div className="flex justify-between border-b border-gray-300 p-4 py-6">
            <h1 className="text-xl">{method}</h1>
            <X onClick={onCancel} className="transition ease duration-300 hover:scale-110 cursor-pointer" />
          </div>
          <div>
            <div className="p-4">
              <div className="flex flex-col gap-4">
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
                    onChange={handleChange}
                    value={formData.title}
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
                    onChange={handleChange}
                    value={formData.description}
                    className="w-full py-2 px-4 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md"></textarea>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priority" className="text-gray-500 text-sm pb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    defaultValue="low"
                    className="w-full py-2 px-4 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md"
                    onChange={handleChange}
                    value={formData.priority}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="date" className="text-gray-500 text-sm pb-1">
                    Due date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="data"
                    onChange={handleChange}
                    value={formData.date}
                    className="w-full py-1.5 px-3 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="tags" className="text-gray-500 text-sm pb-1">
                    Tags
                  </label>
                  <div className="relative flex flex-row gap-4 items-center">
                    <input
                      type="text"
                      name="tagsText"
                      id="tags"
                      placeholder="Add a tag"
                      onChange={(e) => setTagText(e.target.value)}
                      value={tagText}
                      autoComplete="off"
                      className="w-full py-1.5 px-3 outline-none border border-gray-300 focus:ring ring-blue-500 rounded-md pr-26"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddTag();
                        setTagText("");
                      }}
                      className="absolute right-12 bg-blue-600 h-[38px] px-4 rounded-tl-xl rounded-bl-xl rounded-tr-md rounded-br-md text-white hover:bg-blue-700 cursor-pointer">
                      Add a tag
                    </button>
                    <div
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={() => {
                        setShowColorPicker(!showColorPicker);
                        setColorPickerButtonActive(!colorPickerButtonActive);
                      }}
                      className={`border ${
                        colorPickerButtonActive ? `border-blue-500/40 text-blue-500` : `border-gray-200`
                      } p-1 rounded-md cursor-pointer hover:text-blue-700 hover:border-blue-800/40`}>
                      <Palette size={28} />
                    </div>
                    {showColorPicker && (
                      <div ref={colorPickerRef} className="absolute sm:top-0 right-12">
                        <SketchPicker
                          color={currentColor}
                          disableAlpha
                          onChangeComplete={(color) => setCurrentColor(color.hex)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 pt-4 h-auto flex-wrap">
                    {formData.tags.map((tag) => (
                      <CustomFlag
                        key={tag.id}
                        color={tag.color}
                        text={tag.text}
                        size="small"
                        allowDelete={true}
                        onClick={() => deleteFlag(tag.id)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={onCancel}
                    className="border border-gray-300 text-gray-500 rounded-md px-3 py-1.5 font-semibold text-sm hover:bg-gray-50 cursor-pointer">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 px-3 py-1.5 text-white font-semibold rounded-md text-sm hover:bg-blue-700 cursor-pointer">
                    {method}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
