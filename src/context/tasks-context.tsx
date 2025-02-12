"use client";

import { Task } from "../data/schema";
import { ITask } from "@/data/tasks";
import useDialogState from "@/hooks/use-dialog-state";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";


type TasksDialogType = "create" | "update" | "delete" | "import";

interface TasksContextType {
  open: TasksDialogType | null;
  setOpen: (str: TasksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
  setNewTask: (task: Omit<Task, "id">) => void;
  tasksData: ITask[];
  deleteTask: (task: ITask) => void;
  onChangeTask: (
     task: Omit<ITask, "id"> & { id?: string },
     isUpdate: boolean
   ) => void
}

const TasksContext = React.createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TasksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TasksDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);
   const [tasksData, setTasksData] = useState<ITask[]>([]);

   const onChangeTask = (
     task: Omit<ITask, "id"> & { id?: string },
     isUpdate: boolean
   ) => {
     if (isUpdate && task.id) {
       const res = tasksData.filter((e) => e.id !== task.id);
       setTasksData([...res, task as ITask]);
     } else {
       setTasksData([...tasksData, task as ITask]);
     }
   };

   const deleteTask = (task: ITask) => {
     const tasks = tasksData.filter((e) => e.id !== task.id);
     setTasksData(tasks);
   };
  
  // Function to set a new task with an auto-generated ID
  const setNewTask = (task: Omit<Task, "id">) => {
    setCurrentRow({ ...task, id: uuidv4() });
  };

  return (
    <TasksContext.Provider value={{ open, setOpen, currentRow, setCurrentRow, setNewTask,tasksData,deleteTask,onChangeTask }}>
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