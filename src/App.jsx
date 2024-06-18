import { Outlet } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";

function App() {
  return (
    <>
      <SiteHeader />
      <Outlet />
    </>
  );
}

export { App };
