import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom"
import Home from "./containers/homePage/home"
import About from "./containers/aboutPage/about";
import NotFoundPage from "./containers/notFoundPage/notFound";
import HeaderLayout from "./containers/headerLayout/headerLayout";
import HeaderLayoutLoggedin from "./containers/headerLayout/headerLayoutLoggedin";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import Cars from "./containers/cars/cars";
import Resturant from "./containers/resturant/resturant";
import Flight from "./containers/flight/flight";
import Hotel from "./containers/hotel/hotel";
import TourPlaces from "./containers/tourPlaces/tourPlaces";
import Dashboard from "./containers/dashboard/dashboard"
import ProtectedRoute from "./components/protectedRoute/protectedRoute"
import { useEffect } from "react";
function App() {
  const user = localStorage.getItem("user_details")

  // useEffect(() => {
  //   const handleCleanup = () => {
  //     localStorage.removeItem("access_token");
  //     localStorage.removeItem("refresh_token");
  //     localStorage.removeItem("user_details");
  //     // You can add API call for server-side logout here if needed
  //   };

  //   // Set up event listeners
  //   window.addEventListener('beforeunload', handleCleanup);
  //   window.addEventListener('pagehide', handleCleanup);

  //   return () => {
  //     // Clean up event listeners
  //     window.removeEventListener('beforeunload', handleCleanup);
  //     window.removeEventListener('pagehide', handleCleanup);
  //   };
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
         <>
        {!user && (
          <>
            <Route path="/" element={<HeaderLayout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
            </Route>
          </>
        )}

        {user && (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <HeaderLayoutLoggedin />
                </ProtectedRoute>
              }
            >
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Tourplaces" element={<TourPlaces />} />
              <Route path="/Flight" element={<Flight />} />
              <Route path="/Hotel" element={<Hotel />} />
              <Route path="/Resturants" element={<Resturant />} />
              <Route path="/Cars" element={<Cars />} />
              {/* <Route index element={<Navigate to="/Dashboard" />} /> */}
            </Route>
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
          </>
    </>
    )
  );




  return (
  <RouterProvider router={router}/>
  )
};

export default App;
// BookiVerse