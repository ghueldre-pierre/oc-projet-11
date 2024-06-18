import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>
  )
);

export { AppRouter };
