import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <h1>ArgentBank</h1>
      </header>
      <Outlet />
    </>
  );
}

export { App };
