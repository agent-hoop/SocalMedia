import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import Explore from "./pages/Explore";
import Demo from "./Demo/Demo";
import Login from "./Demo/Login";
import Profile from "./pages/Profile";
import { AuthProvider } from "./Demo/DemoAuth";
import { ContextProvider } from "./Demo/DemoContext";
import Test from "./Demo/Test";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // this makes it default for '/'
        element: <HomePage />
      },
      {
        path: "explore",
        element: <Explore />
      }
    ]
  },
  {
    path: "/demo",
    element: (
      <AuthProvider>
        <ContextProvider>
          <Demo />
        </ContextProvider>
      </AuthProvider>
    )
  },
  {
    path:'/demo/login',
    element: <AuthProvider><Login/> </AuthProvider> ,

  },
  {
    path:'/demo/1',
    element:<Test/>
  },
  {
    path: "/profile/:id",
    element: <Profile />
  },
  {
    path: "*",
    element: <h1>404 | Page Not Found</h1>
  }
]);

export default Routes;
