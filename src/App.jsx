import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainLayout from "./dashboard/layout/MainLayout";
import AdminIndex from "./dashboard/pages/AdminIndex";
import Login from "./dashboard/pages/Login";
import ProtectDashboard from "./middleware/ProtectDashboard";
import notFoundImage from "../src/assets/404.png";
import Subscribers from "./dashboard/pages/Subscribers";
import ContactQuerry from "./dashboard/pages/ContactQuerry";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectDashboard />}>
            <Route path="" element={<MainLayout />}>
              <Route path="admin" element={<AdminIndex />} />
              <Route path="querry" element={<ContactQuerry />} />
              <Route path="subscribers" element={<Subscribers />} />
            </Route>
          </Route>
          <Route 
            path="*"
            element={
              <div className="w-full h-screen flex justify-center items-center">
                <img src={notFoundImage} alt="" />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
