import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { Reviews } from "./pages/Reviews";
import { AuthPage } from "./pages/AuthPage";
import { Bookmarks } from "./pages/Bookmarks";
import { Details } from "./pages/Details";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: '#10B981',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#10B981',
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
  );
};
