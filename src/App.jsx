import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom"
import Home from "./containers/homePage/home"
import About from "./containers/aboutPage/about";
import NotFoundPage from "./containers/notFoundPage/notFound";
import HeaderLayout from "./containers/headerLayout/headerLayout";
import Login from "./containers/login/login";
import Register from "./containers/register/register";

import Dashboard from "./containers/dashboard/dashboard"
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<HeaderLayout/>}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/Dashboard" element = {<Dashboard/>}/>
      </Route>
    </>
    )
  );




  return (
  <RouterProvider router={router}/>
  )
};

export default App;
// BookiVerse