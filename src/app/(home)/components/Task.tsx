type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: "High" | "Medium" | "Low";
    dueDate: string | null;
  };
  