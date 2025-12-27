import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main
        className="flex-1 p-6 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/dashboard-bg.png')",
        }}
      >
        {/* overlay باش الكتابة تبان */}
        <div className="absolute inset-0 bg-white/80"></div>

        {/* real content */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
