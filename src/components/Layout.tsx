import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "sonner";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {" "}
      {/* Thêm overflow-hidden */}
      {/* Sidebar */}
      <Toaster richColors position="top-right" />
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
