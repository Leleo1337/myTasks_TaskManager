export type filtersTabProps = {
   quantity: {
      all: number;
      low: number;
      medium: number;
      high: number;
      completed: number;
      uncompleted: number;
   };
   filter: any; // placeholder
   onStatusFilterChange: (arg: string) => void
   onPriorityFilterChange: (arg: string) => void
};