document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (name && email && message) {
        document.getElementById('form-status').textContent = 'Thank you for your message!';
        document.getElementById('form-status').style.color = 'green';

        // Clear the form fields after successful submission
        document.getElementById('contact-form').reset();

        // Optionally, add code here to send the form data to your email or server
    } else {
        document.getElementById('form-status').textContent = 'Please fill in all fields.';
        document.getElementById('form-status').style.color = 'red';
    }
});
