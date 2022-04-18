// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Contact from "./pages/Contact/Contact";
import JobPage from "./pages/JobPage/JobPage";
import WorkPage from "./pages/WorkPage/WorkPage";
// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import TripHistory from "./pages/TripHistory/TripHistory";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/jobpage" element={<JobPage />} />
        <Route path="/history" element={<TripHistory />} />
        <Route path="/jobs" element={<WorkPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
