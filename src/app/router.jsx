import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/HomePage";
import { loginAction, LoginPage } from "../pages/LoginPage";
import { profileAction, ProfilePage } from "../pages/ProfilePage";
import { AccessRestriction } from "../components/AccessRestriction";

const AppRouter = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <AccessRestriction userConnected={false} redirectTo="/profile" />,
        children: [
          {
            index: true,
            element: <LoginPage />,
            action: loginAction
          }
        ]
      },
      {
        path: "profile",
        element: <AccessRestriction userConnected={true} redirectTo="/login" />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
            action: profileAction
          }
        ]
      }
    ]
  }
])

export { AppRouter };
