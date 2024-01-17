// Helper function to execute database queries
function queryDatabase(query, values) {
    console.log('Executing query:', query);  // Add this line for debugging
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);  // Add this line for debugging
                reject(err);
            } else {
                console.log('Query results:', results);  // Add this line for debugging
                resolve(results);
            }
        });
    });
}

// Registration endpoint
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the username or email already exists in the database
        const userExistsQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        const existingUser = await queryDatabase(userExistsQuery, [username, email]);

        if (existingUser.length > 0) {
            console.log('User already exists:', existingUser);  // Add this line for debugging
            return res.json({ success: false, message: 'Username or email already exists' });
        }

        // Insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        const result = await queryDatabase(insertUserQuery, [username, password, email]);

        console.log('User registered successfully:', result);

        return res.json({ success: true, message: 'Thank you for registering!' });
    } catch (error) {
        console.error('Registration error:', error);  // Add this line for debugging
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
        const port = 5500;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

       
        }
});
