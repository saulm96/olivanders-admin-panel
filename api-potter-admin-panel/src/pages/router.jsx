import {createBrowserRouter} from "react-router-dom";

import LoginForm from "./LoginForm/LoginForm";
import Root from "./Root"

import Cores from "./AdminPanel/Cores/Cores";
import Wands from "./AdminPanel/Wands/Wands";
import Woods from "./AdminPanel/Woods/Woods";
import Languages from "./AdminPanel/Languages/Languages";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/admin-panel/",
    element: <Root />,
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
      }
    ] 
  }
])

export default router;