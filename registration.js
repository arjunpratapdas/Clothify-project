function register() {
    // Get registration form data
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    // Make API request to check if the user is already registered
    fetch('/api/checkRegistration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
    })
    .then(response => response.json())
    .then(data => {
        const registrationStatus = document.getElementById("registrationStatus");

        if (data.alreadyRegistered) {
            registrationStatus.textContent = "User already registered";
            registrationStatus.style.color = "red";
        } else {
            // If not already registered, make API request to register endpoint
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    registrationStatus.textContent = "You have been registered";
                    registrationStatus.style.color = "white";
                } else {
                    registrationStatus.textContent = "Registration failed. Please try again.";
                    registrationStatus.style.color = "white";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
