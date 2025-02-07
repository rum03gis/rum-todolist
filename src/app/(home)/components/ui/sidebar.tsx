"use client";

import React from "react";
import { useTheme } from "../../context/theme-context";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Sử dụng theme-context để hỗ trợ Light/Dark Mode

  return (
    <div
      className={`h-screen w-64 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 flex flex-col justify-between`}
    >
      {/* Header */}
      <div className="p-4">
        <h2 className="text-xl font-bold">ShadCN Admin</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Vite + ShadCNUI</p>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 space-y-2 px-4">
        <li>
          <a
            href="todo"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Todo List
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Tasks
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Apps
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Chats <span className="text-xs bg-red-500 text-white rounded-full px-2 py-1 ml-2">3</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Users
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
          >
            Help Center
          </a>
        </li>
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between">
          <p className="text-sm">satnaing</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">satnaingdev@gmail.com</p>
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 mr-2" />
            ) : (
              <Sun className="w-5 h-5 mr-2" />
            )}
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
