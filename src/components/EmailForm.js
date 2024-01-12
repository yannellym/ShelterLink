import React, { useState } from 'react';
import '../styles/Emailform.css'



const EmailForm = ({ petData, onSendEmail }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [emailSent, setEmailSent] = useState(false);
    const defaultMessage = 
    `Hi, my name is ${storedUser.attributes.name}. I'm interested in adopting ${petData.name} and would love more information about their background, temperament, and the adoption process. Thank you!`;

    const [message, setMessage] = useState(defaultMessage);
    const subject = `Inquiry for ${petData.name} ID: ${petData.id}`

    const handleSendEmail = () => {
        console.log(storedUser.attributes.email, petData.contact.email, subject, message)
        // Call the provided onSendEmail function with user's email and message
        onSendEmail(storedUser.attributes.email, petData.contact.email, subject, message);
    
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
