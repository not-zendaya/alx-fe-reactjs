import React from "react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">User Profile</h1>
      <nav className="flex gap-4 mb-4">
        <Link to="details" className="text-blue-600 underline">Profile Details</Link>
        <Link to="settings" className="text-blue-600 underline">Profile Settings</Link>
      </nav>

       <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;
