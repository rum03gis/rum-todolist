"use client";

import { useEffect } from "react";
import { Task } from "../../data/schema";
import { ITask } from "../../data/tasks";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectDropdown } from "./select-dropdown";
import { v4 as uuidv4 } from "uuid";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Task;
  onChangeTask: (e: ITask, isUpdate: boolean) => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  status: z.string().min(1, "Please select a status."),
  label: z.string().min(1, "Please select a label."),
  priority: z.string().min(1, "Please choose a priority."),
});

type TasksForm = z.infer<typeof formSchema>;

export function TasksMutateDrawer({ open, onOpenChange, currentRow, onChangeTask }: Props) {
  const isUpdate = !!currentRow;

  const form = useForm<TasksForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "",
      label: "",
      priority: "",
    },
  });

  
  useEffect(() => {
    if (currentRow) {
      form.reset({
        title: currentRow.title,
        status: currentRow.status,
        label: currentRow.label,
        priority: currentRow.priority,
      });
    } else {
      form.reset();
    }
  }, [currentRow]);

  const onSubmit = (data: TasksForm) => {
    const newTask = {
      id: isUpdate ? currentRow?.id : uuidv4(),
      ...data,
    };

    onChangeTask(newTask, isUpdate);
    onOpenChange(false);

    toast({
      title: isUpdate ? "Task Updated" : "Task Created",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(newTask, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
      }}
    >
      <SheetContent className="flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle>{isUpdate ? "Update" : "Create"} Task</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? "Update the task by providing necessary info."
              : "Add a new task by providing necessary info."}
            Click save when you’re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form id="tasks-form" onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-5">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Title</FormLabel>
                <FormControl><Input {...field} placeholder="Enter a title" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Status</FormLabel>
                <SelectDropdown
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select status"
                  items={[
                    { label: "In Progress", value: "in progress" },
                    { label: "Backlog", value: "backlog" },
                    { label: "Todo", value: "todo" },
                    { label: "Canceled", value: "canceled" },
                    { label: "Done", value: "done" },
                  ]}
                />
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="label" render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Label</FormLabel>
                <SelectDropdown
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select label"
                  items={[
                    { label: "Document", value: "document" },
                    { label: "Feature", value: "feature" },
                    { label: "Bug", value: "bug" },
                  ]}
                />
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="priority" render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Priority</FormLabel>
                <SelectDropdown
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select priority"
                  items={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                  ]}
                />
                <FormMessage />
              </FormItem>
            )} />
          </form>
        </Form>

        <SheetFooter>
          <Button type="submit" form="tasks-form">{isUpdate ? "Update" : "Create"} Task</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
