export type taskProps = {
   _id?: string;
   title: string;
   description: string;
   priority: "Low" | "Medium" | "High";
   tags?: {
      text: string;
      color: string;
   }[];
   date: string;
   toggleComplete: () => void;
   toggleSettings: () => void;
   toggleEditForm: () => void;
   deleteTask: () => void;
   completed: boolean;
   menuOpen: boolean;
};

export type taskFormProps = {
      method: string
      task?: taskProps
      onCancel: () => void
      onSubmitSuccess: () => void
};
