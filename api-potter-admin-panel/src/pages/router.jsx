import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Root from "./Root"
import LoginForm from "./LoginForm/LoginForm";

import Cores from "./AdminPanel/Cores/Cores";
import Wands from "./AdminPanel/Wands/Wands";
import Woods from "./AdminPanel/Woods/Woods";
import Languages from "./AdminPanel/Languages/Languages";
import Wandmakers from "./AdminPanel/Wandmakers/Wandmakers";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/admin-panel",
    element:(
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "cores",
        element: <Cores />,
      },
      {
        path: "wands",
        element: <Wands />,
      },
      {
        path: "woods",
        element: <Woods />,
      },
      {
        path: "languages",
        element: <Languages />
      },
      {
        path:"wandmakers",
        element: <Wandmakers />
      }
    ] 
  }
])

export default router;