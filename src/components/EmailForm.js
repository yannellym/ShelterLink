import React, { useState } from 'react';
import '../styles/Emailform.css'



const EmailForm = ({ petData, onSendEmail }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [emailSent, setEmailSent] = useState(false);
    const defaultMessage = 
    `Hi, my name is ${storedUser.attributes.name}. I'm interested in adopting ${petData.name} and would love more information about their background, temperament, and the adoption process. Thank you!`;

    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState(defaultMessage);


    const handleSendEmail = () => {
        // Call the provided onSendEmail function with user's email and message
        onSendEmail(userEmail, message);

        // Optionally, you can clear the form fields after sending the email
        setUserEmail('');
        
        // Update the state to indicate that the email has been sent
        setEmailSent(true);
    };

    return (
        <div className="email-form">
        <h3>Interested in {petData.name}?</h3>
        <div>
            <label style={{ display: 'block' }}>Shelter's Email:</label>
            <input type="email" value={petData.contact.email} />
            <label>Your Email:</label>
            <input type="email" value={storedUser.attributes.email}/>
        </div>
        <div>
            <label>Message:</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="button-container">
            <button className="inquiry_btn" onClick={handleSendEmail} disabled={emailSent}>
                {emailSent ? 'Email Sent' : 'Send Email'}
            </button>
            <p className="bottom_text">Send additional inquiries to the shelter at: {petData.contact.email}</p>
        </div>
        </div>
    );
    };

export default EmailForm;
