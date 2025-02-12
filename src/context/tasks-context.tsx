"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useDialogState from "@/hooks/use-dialog-state";
import { Task } from "../data/schema";

type TasksDialogType = "create" | "update" | "delete" | "import";

interface TasksContextType {
  open: TasksDialogType | null;
  setOpen: (str: TasksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
  setNewTask: (task: Omit<Task, "id">) => void;
}

const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TasksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TasksDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);

  // Function to set a new task with an auto-generated ID
  const setNewTask = (task: Omit<Task, "id">) => {
    setCurrentRow({ ...task, id: uuidv4() });
  };

  return (
    <TasksContext.Provider value={{ open, setOpen, currentRow, setCurrentRow, setNewTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error("useTasks has to be used within <TasksProvider>");
  }

  return tasksContext;
};