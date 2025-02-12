import TasksProvider from "@/context/tasks-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <TasksProvider>{children}</TasksProvider>
    </main>
  );
}