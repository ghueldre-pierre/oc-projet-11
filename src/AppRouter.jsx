import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./App";

const AppRouter = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App />} />
));

export { AppRouter };