import { Home } from "./pages/Home";
import { Reviews } from "./pages/Reviews";
import { Browse } from "./pages/Browse";
import { AuthPage } from "./pages/AuthPage";
import { Bookmarks } from "./pages/Bookmarks";
import { Details } from "./pages/Details";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Bookmarks />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};
