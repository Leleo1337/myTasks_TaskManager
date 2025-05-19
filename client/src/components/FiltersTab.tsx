type filtersTabProps = {
   quantity: {
      all: number;
      low: number;
      medium: number;
      high: number;
      completed: number;
      uncompleted: number;
   };
   filter: {
      status: {
         all: any;
         active: any;
         completed: any;
      };
      priority: {
         all: any;
         low: any;
         medium: any;
         High: any;
      };
   };
};

export default function FiltersTab({ quantity, filter }: filtersTabProps) {
   const btnActive = `bg-blue-300/60 text-blue-700 py-1 px-4 rounded-md border border-blue-500`;
   return (
      <div className="p-4 mb-8 border border-gray-200 rounded-md space-y-4">
         <div className="space-y-2">
            <h4 className="font-semibold text-lg text-gray-500">Status</h4>
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="cursor-pointer">
                  <div
                     className={
                        filter
                           ? btnActive
                           : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
                     }>
                     All ({quantity.all})
                  </div>
               </div>
               <div className="cursor-pointer">
                  <div
                     className={
                        filter
                           ? btnActive
                           : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
                     }>
                     Active ({quantity.uncompleted})
                  </div>
               </div>
               <div className="cursor-pointer">
                  <div
                     className={
                        filter
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
                     className={
                        filter
                           ? btnActive
                           : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
                     }>
                     All ({quantity.all})
                  </div>
               </div>
               <div className="cursor-pointer">
                  <div
                     className={
                        filter
                           ? btnActive
                           : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
                     }>
                     Low ({quantity.low})
                  </div>
               </div>
               <div className="cursor-pointer">
                  <div
                     className={
                        filter
                           ? btnActive
                           : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
                     }>
                     Medium ({quantity.medium})
                  </div>
               </div>
               <div className="cursor-pointer">
                  <div
                     className={
                        filter
                           ? btnActive
                           : `bg-white py-1 px-4 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700`
                     }>
                     High ({quantity.high})
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
