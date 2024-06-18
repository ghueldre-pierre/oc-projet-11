import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as DataProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import "./index.css";
import { AppStore } from "./AppStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider store={AppStore}>
      <RouterProvider router={AppRouter} />
    </DataProvider>
  </React.StrictMode>
);
