import { v4 as uuidv4 } from "uuid";

/**
 * ITask Interface - Defines the structure for a task object
 */
export interface ITask {
  id: string;        // Unique identifier for each task
  title: string;     // Task title
  status: string;    // Task status (e.g., "todo", "in progress", "done")
  label: string;     // Task category (e.g., bug, feature, documentation)
  priority: string;  // Task priority (low, medium, high)
}

/**
 * Sample Tasks - Predefined task list with auto-generated unique IDs
 */
export const tasks: ITask[] = [
  {
    id: uuidv4(),
    title: "Complete project documentation",
    status: "in progress",
    priority: "high",
    label: "documentation",
  },
  {
    id: uuidv4(),
    title: "Fix login page bug",
    status: "todo",
    priority: "medium",
    label: "bug",
  },
  {
    id: uuidv4(),
    title: "Develop new feature for dashboard",
    status: "backlog",
    priority: "high",
    label: "feature",
  },
];
