"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
};

type Props = {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string, newDueDate?: string) => void;
};

export default function TaskList({ tasks, toggleComplete, deleteTask, updateTask }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "active">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "High" | "Medium" | "Low">("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "active" && !task.completed);
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="p-6 space-y-6 shadow-lg rounded-2xl bg-white dark:bg-gray-800">
      <div className="text-center">
        <h2 className="text-xl font-bold">Task Progress</h2>
        <p className="text-gray-600 dark:text-gray-300">
          {completedTasks}/{totalTasks} tasks completed
        </p>
        <Progress value={completionRate} className="h-2 my-2" />
        <p className="text-sm text-gray-500">{completionRate.toFixed(2)}% completed</p>
      </div>

      {/* Search Bar */}
      <Input
        placeholder="Search tasks..."
        className="w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filters */}
      <div className="flex space-x-4">
        <Select onValueChange={(value) => setStatusFilter(value as "all" | "completed" | "active")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Not Completed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setPriorityFilter(value as "all" | "High" | "Medium" | "Low")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        <AnimatePresence>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="p-4 border rounded-xl shadow-md dark:border-gray-700 flex justify-between items-center"
              >
                {/* Pass priority to TaskItem to handle displaying it */}
                <TaskItem
                  task={task}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks available.</p>
          )}
        </AnimatePresence>
      </ul>
    </Card>
  );
}
