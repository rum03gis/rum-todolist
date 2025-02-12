"use client";

import { useTasks } from "../../context/tasks-context";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export function TasksPrimaryButtons() {
  const { setOpen, setCurrentRow } = useTasks();
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </Button>
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