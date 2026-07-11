import React from "react";
import { AppSidebar } from "./app-sidebar/app-sidebar";
import { SidebarProvider } from "./ui/sidebar";
import BottomBanner from "./bottom-banner";

interface AppFrameProps {
  children: React.ReactNode;
}

const AppFrame: React.FC<AppFrameProps> = ({ children }) => {
  return (
    <SidebarProvider open={true}>
      <AppSidebar />
      <main className="w-full">{children}</main>
      <BottomBanner />
    </SidebarProvider>
  );
};

export default AppFrame;
