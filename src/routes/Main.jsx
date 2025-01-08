import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import App from '../App.jsx';
import Admin from "./admin/Admin.jsx";
import Login from "./auth/Login.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user is authenticated, false otherwise
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public route: App */}
          <Route path="/" element={<App />} />

          {/* Public route: Login */}
          <Route path="/login" element={<Login />} />

          {/* Private route: Admin */}
          <Route
            path="/admin"
            element={isAuthenticated ? <Admin /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}