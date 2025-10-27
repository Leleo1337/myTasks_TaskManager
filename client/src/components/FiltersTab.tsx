import type { filtersTabProps } from "../types/filterTypes";

export default function FiltersTab({ filters, setFilters }: filtersTabProps) {
  const btnActive = `bg-blue-300/60 text-blue-700 py-1 px-4 rounded-md border border-blue-500`;
  const btnOff = `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`;
  return (
    <div className="p-4 mb-8 border border-gray-200 rounded-md space-y-4">
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-gray-500">Status</h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <div onClick={() => setFilters((prev: any) => ({ ...prev, status: "all" }))} className="cursor-pointer">
            <div className={`${filters.status == "all" ? btnActive : btnOff}`}>All</div>
          </div>
          <div
            onClick={() => setFilters((prev: any) => ({ ...prev, status: "uncompleted" }))}
            className="cursor-pointer">
            <div className={`${filters.status == "uncompleted" ? btnActive : btnOff}`}>
              uncompleted
            </div>
          </div>
          <div onClick={() => setFilters((prev: any) => ({ ...prev, status: "completed" }))} className="cursor-pointer">
            <div className={`${filters.status == "completed" ? btnActive : btnOff}`}>Completed</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-gray-500">Priority</h4>
        <div className="grid grid-cols-2 grid-rows-2 sm:flex sm:flex-row gap-4">
          <div onClick={() => setFilters((prev: any) => ({ ...prev, priority: "all" }))} className="cursor-pointer">
            <div className={`${filters.priority == "all" ? btnActive : btnOff}`}>
              All
            </div>
          </div>
          <div onClick={() => setFilters((prev: any) => ({ ...prev, priority: "low" }))} className="cursor-pointer">
            <div className={`${filters.priority == "low" ? btnActive : btnOff}`}>
              Low
            </div>
          </div>
          <div onClick={() => setFilters((prev: any) => ({ ...prev, priority: "medium" }))} className="cursor-pointer">
            <div className={`${filters.priority == "medium" ? btnActive : btnOff}`}>
              Medium
            </div>
          </div>
          <div onClick={() => setFilters((prev: any) => ({ ...prev, priority: "high" }))} className="cursor-pointer">
            <div className={`${filters.priority == "high" ? btnActive : btnOff}`}>
              High
            </div>
          </div>
        </div>
        <span className="text-red-500 font-semibold text-xs">Filters are not working for now xD</span>
      </div>
    </div>
  );
}
