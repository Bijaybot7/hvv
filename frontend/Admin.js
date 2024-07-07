import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [loggedInUsers, setLoggedInUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: totalUsersData } = await axios.get('/admin/users');
                const { data: loggedInUsersData } = await axios.get('/admin/logged-in-users');
                setTotalUsers(totalUsersData.totalUsers);
                setLoggedInUsers(loggedInUsersData.loggedInUsers);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Panel</h1>
            <div>
                <p>Total Registered Users: {totalUsers}</p>
                <p>Total Logged-In Users: {loggedInUsers}</p>
            </div>
        </div>
    );
};

export default AdminPanel;
