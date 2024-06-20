import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as DataProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AppStore } from "./app/store";
import { AppRouter } from "./app/router";
import { tryConnectUser } from "./features/user/userSlice";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider store={AppStore}>
      <RouterProvider router={AppRouter} />
    </DataProvider>
  </React.StrictMode>
);
