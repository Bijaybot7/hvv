import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "./ArtistMessage.css";

const BandUserMessages = () => {
  const [showBandModal, setShowBandModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [userDetails, setUserDetails] = useState({}); // Store user details by bandId
  const [vacancyDetails, setVacancyDetails] = useState({}); // Store vacancy details by vacancyId

  useEffect(() => {
    const fetchUserApplications = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))?.userId;
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3030/applications/user/${userId}`
          );
          const apps = response.data;

          // Fetch user and vacancy details for each application
          const userPromises = apps.map((app) =>
            axios.get(`http://localhost:3030/users/${app.bandId}`)
          );
          const vacancyPromises = apps.map((app) =>
            axios.get(`http://localhost:3030/vacancies/${app.vaccancyId}`)
          );

          const [userResponses, vacancyResponses] = await Promise.all([
            Promise.all(userPromises),
            Promise.all(vacancyPromises),
          ]);

          // Map details to their respective IDs
          const usersMap = {};
          userResponses.forEach((res, index) => {
            usersMap[apps[index].bandId] = res.data.name;
          });

          const vacanciesMap = {};
          vacancyResponses.forEach((res, index) => {
            vacanciesMap[apps[index].vaccancyId] = res.data.description;
          });

          setUserDetails(usersMap);
          setVacancyDetails(vacanciesMap);
          setApplications(apps);
        } catch (error) {
          console.error("Error fetching applications or details:", error);
        }
      }
    };

    fetchUserApplications();
  }, []);

  const handleShowBandModal = (application) => {
    setSelectedApplication(application);
    setShowBandModal(true);
  };

  const handleCloseBandModal = () => {
    setShowBandModal(false);
    setSelectedApplication(null);
  };

  const handleJoin = async () => {
    if (selectedApplication) {
      const userId = JSON.parse(localStorage.getItem("user"))?.userId;
      if (userId) {
        try {
          await axios.put(`http://localhost:3030/users/band/${userId}`, {
            band: userDetails[selectedApplication.bandId] || "Unknown Band",
          });
          alert("Joined the band successfully");
          handleCloseBandModal();
          // Optionally, you might want to refresh the list or update UI accordingly
        } catch (error) {
          console.error("Error joining the band:", error);
          alert("Failed to join the band. Please try again.");
        }
      }
    }
  };

  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <div className="container">
      {/* Back button */}
      <button className="back-btn" onClick={handleBack}>
        <FaArrowLeft className="back-icon" /> Back to Home
      </button>

      {/* Applications List */}
      <div className="grey-table">
        <div className="applications-list">
          <h2>Your Applications</h2>
          {applications.length > 0 ? (
            <ul>
              {applications.map((app) => (
                <li key={app.id} onClick={() => handleShowBandModal(app)}>
                  <p>
                    <strong>Band:</strong>{" "}
                    {userDetails[app.bandId] || "Loading..."}
                  </p>
                  <p>
                    <strong>Vacancy:</strong>{" "}
                    {vacancyDetails[app.vaccancyId] || "Loading..."}
                  </p>
                  <p>
                    <strong>Status:</strong> {app.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      </div>

      {/* Band Modal */}
      {showBandModal && selectedApplication && (
        <div className="modal-overlay">
          <div className="chat-box">
            <div className="chat-header">
              <button className="close-btn" onClick={handleCloseBandModal}>
                ×
              </button>
              <h3>Application Details</h3>
            </div>
            <div className="chat-body">
              <p>
                <strong>Band:</strong>{" "}
                {userDetails[selectedApplication.bandId] || "Loading..."}
              </p>
              <p>
                <strong>Vacancy Description:</strong>{" "}
                {vacancyDetails[selectedApplication.vaccancyId] || "Loading..."}
              </p>
              <p>
                <strong>Status:</strong> {selectedApplication.status}
              </p>

              {/* Conditionally render the Join button */}
              {selectedApplication.status === "Accepted" && (
                <button className="join-btn" onClick={handleJoin}>
                  Join
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BandUserMessages;
