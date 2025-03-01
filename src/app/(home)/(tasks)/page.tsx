"use client";

import { columns } from "../../../components/tasks/columns";
import { DataTable } from "../../../components/tasks/data-table";
import { TasksDialogs } from "../../../components/tasks/tasks-dialogs";
import { TasksPrimaryButtons } from "../../../components/tasks/tasks-primary-buttons";
import TasksProvider, { useTasks } from "../../../context/tasks-context";


export default function Tasks() {
 const { tasksData } = useTasks();

  return (
    <>
      <>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2 p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <TasksPrimaryButtons  />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={tasksData} columns={columns} />
        </div>
      </>

      <TasksDialogs />
    </>
  );
}
