import React, { useState } from 'react';
import { FaRegUserCircle, FaArrowLeft } from 'react-icons/fa'; // Import FaRegUserCircle and FaArrowLeft icons
import './MessageSection.css'; // Import the CSS file

const BandUserMessages = () => {
    // State for modals
    const [showUserModal, setShowUserModal] = useState(false);

    // Handler to show/hide user modal
    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);

    // Handler for the accept button inside the user modal
    const handleAccept = () => {
        alert("Application accepted!"); // Show an alert message when the accept button is clicked
        console.log("Vacancy accepted successfully");
        // Optionally, you can add further actions here when the button is clicked
    };

    // Handler for back arrow to navigate to the home page
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

                {/* User Icon */}
                <div>
                    <button className="icon-btn" onClick={handleShowUserModal}>
                        <FaRegUserCircle /> Nischal Raj Kattel
                    </button>
                </div>

                {/* User Modal */}
                {showUserModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <button className="close-btn" onClick={handleCloseUserModal}>×</button>
                            <h3>Artist Message</h3>
                            <p>Nischal applied to the vacancy .</p>
                            {/* Accept button inside the user modal */}
                            <button className="grey-btn" onClick={handleAccept}>
                                Accept
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BandUserMessages;
