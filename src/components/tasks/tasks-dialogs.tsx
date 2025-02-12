"use client";

import { useTasks } from "../../context/tasks-context";
import { ITask } from "../../data/tasks";
import { ConfirmDialog } from "./confirm-dialog";
import { TasksMutateDrawer } from "./tasks-mutate-drawer";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

export function TasksDialogs({
  onChangeTask,
  deleteTask,
}: {
  onChangeTask: (task: ITask, isUpdate: boolean) => void;
  deleteTask: (task: ITask) => void;
}) {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks();

  return (
    <>
      {}
      <TasksMutateDrawer
        key="task-create"
        open={open === "create"}
        onOpenChange={() => {
          setOpen(null);
          setCurrentRow(null); 
        }}
        onChangeTask={(task) => {
          const newTask = { ...task, id: uuidv4() };
          onChangeTask(newTask, false);
        }}
      />

      
      {currentRow && (
        <>
          
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={() => {
              setOpen(null);
              setTimeout(() => setCurrentRow(null), 500);
            }}
            currentRow={currentRow}
            onChangeTask={(task) => {
              const updatedTask = { ...currentRow, ...task }; 
              onChangeTask(updatedTask, true);
            }}
          />

         
          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => setOpen(null)}
            handleConfirm={() => {
              deleteTask(currentRow);
              setOpen(null);
              setCurrentRow(null);
              toast({
                title: "Task Deleted",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
            className="max-w-md"
            title="Delete this task?"
            desc={
              <>
                You are about to delete this task. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  );
}