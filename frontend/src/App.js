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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/post/:id",
        // lazy: () => import("./pages/Post/PostDetail"),
        element: <PostDetail/>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
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
