import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle, FaArrowLeft } from "react-icons/fa"; // Import FaRegUserCircle and FaArrowLeft icons
import "./MessageSection.css"; // Import the CSS file

const UserVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [applications, setApplications] = useState({}); // Store applications per vacancy
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [userNames, setUserNames] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/vacancies/user/${userId}`
        );
        setVacancies(response.data);

        // Fetch applications for each vacancy
        const applicationPromises = response.data.map((vacancy) =>
          axios.get(
            `http://localhost:3030/applications/vaccancy/${vacancy._id}`
          )
        );

        const applicationsResponses = await Promise.all(applicationPromises);

        // Map applications to their respective vacancies
        const applicationsMap = {};
        applicationsResponses.forEach((res, index) => {
          const vacancyId = response.data[index]._id;
          applicationsMap[vacancyId] = res.data;
        });

        setApplications(applicationsMap);
        const userIds = [
          ...new Set(
            applicationsResponses.flatMap((res) =>
              res.data.map((app) => app.userId)
            )
          ),
        ];
        const userPromises = userIds.map((id) =>
          axios.get(`http://localhost:3030/users/${id}`)
        );

        const usersResponses = await Promise.all(userPromises);

        // Map user names to their respective userIds
        const userNamesMap = {};
        usersResponses.forEach((res) => {
          const { _id, name } = res.data;
          userNamesMap[_id] = name;
        });

        setUserNames(userNamesMap);
      } catch (error) {
        console.error("Error fetching vacancies or applications:", error);
      }
    };

    fetchVacancies();
  }, [userId]);

  const handleShowUserModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setSelectedVacancy(null);
    setSelectedApplication(null); // Reset selected application
  };

  const handleAccept = async () => {
    if (selectedApplication) {
      try {
        await axios.patch(
          `http://localhost:3030/applications/${selectedApplication._id}`,
          {
            status: applicationStatus,
          }
        );
        alert("Application status updated!");

        // Update the application in the local state
        setApplications((prev) => {
          const updatedApplications = { ...prev };
          const vacancyId = selectedVacancy._id;
          updatedApplications[vacancyId] = updatedApplications[vacancyId].map(
            (app) =>
              app._id === selectedApplication._id
                ? { ...app, status: applicationStatus }
                : app
          );
          return updatedApplications;
        });

        setSelectedApplication(null);
        setApplicationStatus("");
      } catch (error) {
        console.error("Error updating application status:", error);
      }
    }
  };

  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <div className="container">
      {/* Grey transparent table on the right side of the page */}
      <div className="grey-table">
        {/* Back arrow button for navigation back to the home page */}
        <button className="back-btn" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>

        {/* Vacancies list */}
        <h2>My Vacancies</h2>
        <ul className="vacancy-list">
          {vacancies.map((vacancy) => (
            <li key={vacancy._id}>
              <div className="vacancy-item">
                <p>
                  <strong>Band Name:</strong> {vacancy.bandName}
                </p>
                <p>
                  <strong>Position:</strong> {vacancy.position}
                </p>
                <p>
                  <strong>Location:</strong> {vacancy.location}
                </p>
                <p>
                  <strong>Experience:</strong> {vacancy.experience} years
                </p>
                <p>
                  <strong>Description:</strong> {vacancy.description}
                </p>
                <p>
                  <strong>Applications:</strong>{" "}
                  {applications[vacancy._id]?.length || 0}
                </p>
                <button
                  className="view-btn"
                  onClick={() => handleShowUserModal(vacancy)}
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* User Modal */}
        {showUserModal && selectedVacancy && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={handleCloseUserModal}>
                ×
              </button>
              <h3>Vacancy Details</h3>
              <p>
                <strong>Band Name:</strong> {selectedVacancy.bandName}
              </p>
              <p>
                <strong>Position:</strong> {selectedVacancy.position}
              </p>
              <p>
                <strong>Location:</strong> {selectedVacancy.location}
              </p>
              <p>
                <strong>Experience:</strong> {selectedVacancy.experience} years
              </p>
              <p>
                <strong>Description:</strong> {selectedVacancy.description}
              </p>
              <p>
                <strong>Applications:</strong>{" "}
                {applications[selectedVacancy._id]?.length || 0}
              </p>

              {/* Application Details */}
              {applications[selectedVacancy._id] &&
              applications[selectedVacancy._id].length > 0 ? (
                <div>
                  <h4>Applications</h4>
                  <ul className="application-list">
                    {applications[selectedVacancy._id].map((app) => (
                      <li key={app._id} className="application-item">
                        <p>
                          <strong>Applicant:</strong>{" "}
                          {userNames[app.userId] || "Unknown"}
                        </p>
                        <p>
                          <strong>Status:</strong> {app.status}
                        </p>
                        {/* Add more details as needed */}
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setApplicationStatus("Accepted"); // Set default status or use a dropdown
                          }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setApplicationStatus("Rejected"); // Set default status or use a dropdown
                          }}
                        >
                          Reject
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No applications yet.</p>
              )}

              {/* Accept button inside the user modal */}
              {selectedApplication && (
                <button className="grey-btn" onClick={handleAccept}>
                  Update Status to {applicationStatus}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVacancies;
