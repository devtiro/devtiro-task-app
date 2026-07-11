import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { TodoListProvider } from "./providers/task-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TodoListProvider>
      {/* Dark Mode */}
      <div className="dark text-foreground bg-background min-h-screen min-w-screen flex justify-center items-center">
        <App />
      </div>
      <Toaster />
    </TodoListProvider>
  </StrictMode>,
);
