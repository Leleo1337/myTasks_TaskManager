export type taskProps = {
  _id?: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  tags?: {
    id?: string;
    text: string;
    color: string;
  }[];
  date: string;
  toggleComplete: () => void;
  toggleSettings: () => void;
  toggleEditForm: () => void;
  deleteTask: () => void;
  onCloseMenu: () => void;
  completed: boolean;
  menuOpen: boolean;
};

export type taskFormProps = {
  method: "create" | "edit";
  task?: taskProps;
  onCancel: () => void;
  onSubmitSuccess: () => void;
};
