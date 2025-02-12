import { v4 as uuidv4 } from "uuid";
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from "@tabler/icons-react";

/**
 * Task Labels - Used for categorizing tasks
 */
export const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
];

/**
 * Task Statuses - Defines the different states a task can have
 */
export const statuses = [
  { value: "backlog", label: "Backlog", icon: IconExclamationCircle },
  { value: "todo", label: "Todo", icon: IconCircle },
  { value: "in progress", label: "In Progress", icon: IconStopwatch },
  { value: "done", label: "Done", icon: IconCircleCheck },
  { value: "canceled", label: "Canceled", icon: IconCircleX },
];

/**
 * Task Priorities - Defines task urgency levels
 */
export const priorities = [
  { label: "Low", value: "low", icon: IconArrowDown },
  { label: "Medium", value: "medium", icon: IconArrowRight },
  { label: "High", value: "high", icon: IconArrowUp },
];

/**
 * Sample Tasks - Initial data with unique IDs
 */
export const tasks = [
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
