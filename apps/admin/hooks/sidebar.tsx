import * as React from "react";

type Context = {
  sidebarOpen: boolean;
  toggleSidebar: VoidFunction;
};

export const SidebarContext = React.createContext<Context>({
  sidebarOpen: true,
  toggleSidebar: () => {},
});

export const SidebarContextProvider: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((state) => !state);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): [boolean, VoidFunction] => {
  const context = React.useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a SidebarContextProvider");
  }

  return [context.sidebarOpen, context.toggleSidebar];
};
