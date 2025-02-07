"use client";

import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import Sidebar from "./components/ui/sidebar"; // Import Sidebar

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
};

export default function TodoListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  const addTask = (text: string, priority: "High" | "Medium" | "Low", dueDate: string | null) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      dueDate: dueDate || undefined,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Toggle task completion status
  const toggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Edit a task
  const updateTask = (id: number, newText: string, newDueDate?: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText, dueDate: newDueDate || task.dueDate } : task
      )
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 max-w-md mx-auto p-4">
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} updateTask={updateTask} />
      </div>
    </div>
  );
}
