const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", 
    database: "fyb"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

app.post('/register', (req, res) => {
    const { name, email, password, category } = req.body; 
    const sql = "INSERT INTO user (Name, Email, Password, Category) VALUES (?, ?, ?, ?)"; 
    const values = [name, email, password, category]; 
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error inserting data into the database' });
        }
        console.log('Data inserted successfully:', result);
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
    if (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Error in Server' });
        return;
    }
    if (result.length > 0) {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(404).json({ message: 'Failed' });
    }
    });
});
    
app.post('/home', (req, res) => {
    const { bandName, position, location, experience, description } = req.body;

    // SQL query to insert a new vacancy
    const sql = "INSERT INTO vacancy (BandName, Position, Location, Experience, Description) VALUES (?, ?, ?, ?, ?)";
    const values = [bandName, position, location, experience, description];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error inserting data into the database' });
        }
        // You can use `result.insertId` to get the ID of the newly inserted record.
        console.log('Vacancy inserted successfully:', result);
        return res.status(200).json({ message: 'Vacancy posted successfully', id: result.insertId });
    });
});


// New route to fetch all posted vacancies
app.get('/home', (req, res) => {
    const sql = "SELECT * FROM vacancy";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Error fetching data from the database' });
        }
        console.log('Vacancies fetched successfully:', result);
        return res.status(200).json(result);
    });
});

app.delete('/home/:id', (req, res) => {
    const vacancyId = req.params.id;
    
    // Define SQL query to delete the vacancy based on the ID
    const sql = 'DELETE FROM vacancy WHERE id = ?';

    db.query(sql, [vacancyId], (err, result) => {
        if (err) {
            // Handle any database error
            console.error('Error deleting vacancy:', err);
            return res.status(500).json({ error: 'Error deleting vacancy from the database' });
        }

        // Check if any rows were affected (i.e., the ID existed and a vacancy was deleted)
        if (result.affectedRows > 0) {
            console.log(`Vacancy with ID ${vacancyId} deleted successfully`);
            return res.status(200).json({ message: 'Vacancy deleted successfully' });
        } else {
            // No vacancy found with the given ID
            console.error(`Vacancy with ID ${vacancyId} not found`);
            return res.status(404).json({ error: `Vacancy with ID ${vacancyId} not found` });
        }
    });
});







const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
