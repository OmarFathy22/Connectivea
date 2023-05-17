/* eslint-disable no-undef */
import Root from "./Root";
import Profile from "./pages/Profile";
import Home from './pages/Home'

// import Home from "./pages/Home";
// import Create from "./pages/Create";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />
        <Route path="profile/:uId" element={<Profile />} />
      
         {/* <Route path="/create" element={<Create />} /> */}
         {/* <Route path="setting" element={<Setting />} /> */}
         {/* <Route path="logout" element={<Logout />} /> */}
        {/* ... etc. */}
      </Route>
  )
);
function App() {
  return (
      <RouterProvider router={router} />
  );
}


export default App;
