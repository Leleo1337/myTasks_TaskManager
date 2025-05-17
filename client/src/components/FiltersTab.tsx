import CustomFlag from "./CustomFlag";

type filtersTabProps = {
    quantity: {
        low: number
        medium: number
        high: number
        completed: number
        uncompleted: number
    }
}

export default function FiltersTab({quantity}:filtersTabProps) {
   return (
      <div className="mb-8 rounded-md space-y-4">
         <div className="space-y-2">
            <h4 className="font-semibold text-lg text-gray-500">Priority</h4>
            <div className="flex gap-4">
               <div className="cursor-pointer">
                  <CustomFlag text={`Low (${quantity.low})`} color="#7B00FF" />
               </div>
               <div className="cursor-pointer">
                  <CustomFlag text={`Medium (${quantity.medium})`} color="#7B00FF" />
               </div>
               <div className="cursor-pointer">
                  <CustomFlag text={`High (${quantity.high})`} color="#7B00FF" />
               </div>
            </div>
         </div>
         <div className="space-y-2">
            <h4 className="font-semibold text-lg text-gray-500">Status</h4>
            <div className="flex gap-4">
               <div className="cursor-pointer">
                  <CustomFlag text={`Completed (${quantity.completed})`} color="#7B00FF" />
               </div>
               <div className="cursor-pointer">
                  <CustomFlag text={`Uncompleted (${quantity.uncompleted})`} color="#7B00FF" />
               </div>
            </div>
         </div>
      </div>
   );
}
