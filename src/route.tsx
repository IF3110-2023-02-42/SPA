import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Verification from "./pages/verification/Verification";
import DiscussionView from "./pages/discussion/DiscussionView";
import Exercise from "./pages/exercise/Exercise";
import ExerciseHistory from "./pages/exercise-history-list/(id)/ExerciseHistory";
import ExHistoryList from "./pages/exercise-history-list/ExHistoryList";

export const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/verification",
          element: <Verification />,
        },
        {
          path: "/discussion_view/:id_diskusi",
          element: <DiscussionView />,
        },
        {
          path: "/exercise/:id",
          element: <Exercise />,
        },
        {
          path: "/exercise-history",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <ExHistoryList />,
            },
            {
              path: ":id",
              element: <ExerciseHistory />,
            },
          ],
        },
      ],
    },
  ]);
