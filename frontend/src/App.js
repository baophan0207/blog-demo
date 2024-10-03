import "./App.css";
import HomePage from "./pages/Home/HomePage";
import Header from "./components/Header/Header";
import {
  Outlet,
  // Link,
  createBrowserRouter,
  RouterProvider,
  // useNavigation,
} from "react-router-dom";
import PostDetail from "./pages/Post/PostDetail";
import { AuthProvider } from "./contexts/auth/AuthContext";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/post/:id",
        // lazy: () => import("./pages/Post/PostDetail"),
        element: <PostDetail />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <Outlet />
      {/* <HomePage /> */}
    </div>
  );
}

export default App;
