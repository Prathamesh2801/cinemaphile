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
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: '#09090b',
                  color: '#77dd77',
                },
                iconTheme: {
                  primary: '#09090b',
                  secondary: '#4CAF50',
                },
              },
              error: {
                style: {
                  background: '#09090b',
                  color: '#FF6961',
                },
                iconTheme: {
                  primary: '#09090b',
                  secondary: '#F44336',
                },
              },
              loading: {
                style: {
                  background: '#424242',
                  color: '#FFFFFF',
                },
              },
            }}
          />
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
