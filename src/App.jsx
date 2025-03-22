import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import Home from "./Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/Home",
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
