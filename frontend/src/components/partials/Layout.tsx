import Footer from "../partials/Footer";
import { NavLink, Outlet } from "react-router";
import { useLocation } from "react-router";

function Layout() {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="card">
        <div className="bg-black p-2 w-[70dvw]">
          <div className="border-2 border-[#00ff00]  p-2 pb-7 font-mono h-full uppercase relative">
            <div className="text-[#00ff00] text-xl my-3 p-3 font-bold">
              <p>WAVE_PAYROLL_SYSTEM_VICTOR_MEDEIROS_</p>
              <NavLink
                to="/"
                className={`underline ${
                  location.pathname === "/payroll-reports" ? "" : "hidden"
                }`}
              >
                Home
              </NavLink>
            </div>
            <div className="w-full h-px bg-[#00ff00] mb-4 opacity-50"></div>
            <Outlet />

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
