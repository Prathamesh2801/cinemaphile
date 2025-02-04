import { Home } from "./pages/Home";
import { Reviews } from "./pages/Reviews";
import { Browse } from "./pages/Browse";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Trending } from "./pages/Trending";
import {Details} from "./pages/Details";
import { BrowserRouter, Routes, Route } from "react-router-dom";



export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:id" element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
