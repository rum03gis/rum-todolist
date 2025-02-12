"use client";

import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useTasks } from "../../context/tasks-context";

export function TasksPrimaryButtons() {
  const { setOpen, setCurrentRow } = useTasks();

  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          setCurrentRow(null); 
          setOpen("create");
        }}
      >
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}