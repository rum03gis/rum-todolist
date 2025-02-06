"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { AlertCircle, Pencil, Check, X, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
};

type Props = {
  task: Task;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newText: string, newDueDate?: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, toggleComplete, deleteTask, updateTask }) => {
  

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDueDate, setNewDueDate] = useState(task.dueDate || "");

  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() && !task.completed : false;

  const handleSave = () => {
    if (newText.trim()) {
      updateTask(task.id, newText, newDueDate);
      setIsEditing(false);
    }
  };
  if (!task) return null; 
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex items-center justify-between p-4 rounded-lg shadow-md transition duration-200 hover:shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className="cursor-pointer w-5 h-5"
          />

          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <Input value={newText} onChange={(e) => setNewText(e.target.value)} />
              <Input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} />
            </div>
          ) : (
            <div>
              <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}`}>
                {task.text}
              </span>
              {task.dueDate && (
                <p className={`text-sm ${isOverdue ? "text-red-500 font-bold" : "text-gray-500 dark:text-gray-400"}`}>
                   {format(new Date(task.dueDate), "dd/MM/yyyy")}
                </p>
              )}
            </div>
          )}

          <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>

          {isOverdue && <AlertCircle className="text-red-500 w-5 h-5" />}
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button size="sm" variant="outline" onClick={handleSave}>
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={() => deleteTask(task.id)}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskItem;