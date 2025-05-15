export type taskProps = {
   toggleCheck: () => void;
   toggleSettings: () => void;
   toggleEditForm: () => void;
   checked: boolean;
   menuOpen: boolean;
};

export type taskFormProps = {
   method: string;
   closeForm: () => void;
};