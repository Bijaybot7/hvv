import React, { useState } from 'react';
import { FaUsersBetweenLines } from 'react-icons/fa6'; // Import FaUsersBetweenLines
import { FaArrowLeft } from 'react-icons/fa'; // Import back arrow icon
import './ArtistMessage.css'; // Import the CSS file

const BandUserMessages = () => {
    // State for modals
    const [showBandModal, setShowBandModal] = useState(false);

    // Handlers to show/hide modals
    const handleShowBandModal = () => setShowBandModal(true);
    const handleCloseBandModal = () => setShowBandModal(false);

    // Handler for the join button inside the band modal
    const handleJoin = () => {
        alert("Joined the band");
        // Optionally, you can add further actions here when the button is clicked
    };

    // Handler for the back button
    const handleBack = () => {
        window.history.back(); // Navigate back to the previous page
    };

    return (
        <div className="container">
            {/* Back button */}
            <button className="back-btn" onClick={handleBack}>
                <FaArrowLeft className="back-icon" /> Back to Home
            </button>

            {/* Band Icon Button in a grey table at the right side of the page */}
            <div className="grey-table">
                <div className="icon-btn" onClick={handleShowBandModal}>
                    <FaUsersBetweenLines className="icon" /> Albatross
                </div>
            </div>

            {/* Band Modal */}
            {showBandModal && (
                <div className="modal-overlay">
                    <div className="chat-box">
                        <div className="chat-header">
                            <button className="close-btn" onClick={handleCloseBandModal}>×</button>
                            <h3>Band Message</h3>
                        </div>
                        <div class="chat-body">
                            <p>Albatross accepted your application.</p>
                            <button class="join-btn" onClick={handleJoin}>
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BandUserMessages;
