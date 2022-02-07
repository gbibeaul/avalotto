import { SidebarButton } from "components/SidebarButton";
import { Sidebar } from "components/Sidebar";
import { SidebarContextProvider, useSidebar } from "hooks/sidebar";

export const AdminLayout: React.FC = ({ children }) => {
  return (
    <SidebarContextProvider>
      <div className="min-h-full">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <SidebarButton />
            {children}
          </div>
        </div>
      </div>
    </SidebarContextProvider>
  );
};
