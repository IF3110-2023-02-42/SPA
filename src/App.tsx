import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import DiscussionView from './pages/discussion_view/DiscussionView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "/discussion_view",
    element: <DiscussionView />,
  }
]) 


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
