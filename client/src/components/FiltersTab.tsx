import type { filtersTabProps } from "../types/filterTypes";

export default function FiltersTab({
  quantity,
  filter,
  onStatusFilterChange,
  onPriorityFilterChange,
}: filtersTabProps) {
  const btnActive = `bg-blue-300/60 text-blue-700 py-1 px-4 rounded-md border border-blue-500`;
  return (
    <div className="p-4 mb-8 border border-gray-200 rounded-md space-y-4">
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-gray-500">Status</h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="cursor-pointer">
            <div
              onClick={() => onStatusFilterChange("All")}
              className={
                filter.status === "All"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              All ({quantity.all})
            </div>
          </div>
          <div className="cursor-pointer">
            <div
              onClick={() => onStatusFilterChange("uncompleted")}
              className={
                filter.status === "uncompleted"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              uncompleted ({quantity.uncompleted})
            </div>
          </div>
          <div className="cursor-pointer">
            <div
              onClick={() => onStatusFilterChange("Completed")}
              className={
                filter.status === "Completed"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              Completed ({quantity.completed})
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-gray-500">Priority</h4>
        <div className="grid grid-cols-2 grid-rows-2 sm:flex sm:flex-row gap-4">
          <div className="cursor-pointer">
            <div
              onClick={() => onPriorityFilterChange("All")}
              className={
                filter.priority === "All"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              All ({quantity.all})
            </div>
          </div>
          <div className="cursor-pointer">
            <div
              onClick={() => onPriorityFilterChange("Low")}
              className={
                filter.priority === "Low"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              Low ({quantity.low})
            </div>
          </div>
          <div className="cursor-pointer">
            <div
              onClick={() => onPriorityFilterChange("Medium")}
              className={
                filter.priority === "Medium"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              Medium ({quantity.medium})
            </div>
          </div>
          <div className="cursor-pointer">
            <div
              onClick={() => onPriorityFilterChange("High")}
              className={
                filter.priority === "High"
                  ? btnActive
                  : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
              }>
              High ({quantity.high})
            </div>
          </div>
        </div>
        <span className="text-red-500 font-semibold text-xs">Filters are not working for now xD</span>
      </div>
    </div>
  );
}
