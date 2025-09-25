import React, { useContext, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import storeContext from "../../context/storeContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dispatch } = useContext(storeContext);

  const logout = () => {
    localStorage.removeItem("Buildifie");
    dispatch({ type: "logout", payload: "" });
    navigate("/login");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden p-4 bg-white flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Dashboard</h1>
        {isOpen ? (
          <HiX size={24} onClick={toggleSidebar} className="cursor-pointer" />
        ) : (
          <HiMenu
            size={24}
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Sidebar */}
      <div onClick={toggleSidebar}
        className={`fixed top-0 left-0 bg-white h-full z-50 transition-transform duration-300 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-[250px] shadow-md`}
      >
        <div className="h-[70px] flex justify-center items-center border-b">
          <Link to={"/"} onClick={toggleSidebar}>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </Link>
        </div>
        <ul className="px-3 flex flex-col gap-y-2 mt-4">
          <SidebarLink
            to="/dashboard/admin"
            icon={<AiFillDashboard />}
            label="Dashboard"
            pathname={pathname}
          />
          <SidebarLink
            to="/dashboard/querry"
            icon={<GrContact />}
            label="Contact Query"
            pathname={pathname}
          />
          <SidebarLink
            to="/dashboard/subscribers"
            icon={<FaUser />}
            label="Subscribers"
            pathname={pathname}
          />
          <li>
            <div
              onClick={logout}
              className="px-3 py-2 hover:bg-red-600 hover:text-white cursor-pointer flex gap-2 items-center rounded"
            >
              <IoLogOutOutline className="text-xl" />
              Logout
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

const SidebarLink = ({ to, icon, label, pathname }) => {
  const active = pathname === to;
  return (
    <li>
      <Link
        to={to}
        className={`px-3 py-2 rounded flex items-center gap-2 
        ${
          active
            ? "bg-indigo-500 text-white"
            : "text-indigo-600 hover:bg-indigo-100"
        }`}
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Sidebar;
