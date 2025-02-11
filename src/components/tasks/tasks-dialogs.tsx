"use client";


import { useTasks } from '../../context/tasks-context';
import { ITask } from '../../data/tasks';
import { ConfirmDialog } from './confirm-dialog';

import { TasksMutateDrawer } from './tasks-mutate-drawer';
import { toast } from '@/hooks/use-toast';


export function TasksDialogs({
  onChangeTask,
  deleteTask,
}: {
  onChangeTask: (e: ITask, isUpdate: boolean) => void;
  deleteTask: (e: ITask) => void;
}) {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks();
  return (
    <>
      <TasksMutateDrawer
        key="task-create"
        open={open === "create"}
        onOpenChange={() => setOpen("create")}
        onChangeTask={onChangeTask}
      />

      

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={() => {
              setOpen("update");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
            onChangeTask={onChangeTask}
          />

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={() => {
              setOpen(null);
              console.log("currentRow", currentRow);

              deleteTask(currentRow as any);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
              toast({
                title: "The following task has been deleted:",
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
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{" "}
                <strong>{currentRow.id}</strong>. <br />
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