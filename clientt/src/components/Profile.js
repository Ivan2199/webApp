import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import "../Style/Profile.css";
import Header from "../components/Navigation";

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:8000/user/getLoggedInUser",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const loggedInUser = response.data;
        console.log(loggedInUser);

        if (!loggedInUser || !loggedInUser.userId) {
          throw new Error("Invalid user data");
        }

        const loggedInUserID = loggedInUser.userId;

        const profileResponse = await axios.get(
          `http://localhost:8000/user/getuser/${loggedInUserID}`
        );

        setProfileData(profileResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return null;
  }

  return (
    <ProfileContext.Provider value={profileData}>
      <div className="profile-container">
        <Header />
        <div className="profile-header">
          <h1>Profilna Stranica</h1>
        </div>
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <img
                src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg"
                alt="Profilna slika"
              />
            </div>
            <div className="profile-info">
              <h2>Informacije o korisniku</h2>
              <p>
                Ime: {profileData.firstName} {profileData.lastName}
              </p>
              <p>Email: {profileData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
