import React, { useState } from 'react';
import '../styles/Emailform.css';
import emailjs from 'emailjs-com';

const EmailForm = ({ petData }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [emailSent, setEmailSent] = useState(false);
    const defaultMessage = `Hi, my name is ${storedUser.attributes.name}. I'm interested in adopting ${petData.name} and would love more information about their background, temperament, and the adoption process. Thank you!`;

    const [message, setMessage] = useState(defaultMessage);
    const subject = `Inquiry for ${petData.name} ID: ${petData.id}`;

    const sendEmail = async (toEmail, fromEmail, subject, message) => {
        const templateParams = {
            to_name: toEmail,  
            from_name: fromEmail,     
            subject: subject,
            message,
        };

        await emailjs.send('service_ogebq0b', 'template_nozw0nh', templateParams, 'Von3vL9e5hbQRbQnR');
    };

    const handleSendEmail = async () => {
        try {
            await sendEmail('mercadoyannelly@gmail.com', storedUser.attributes.email, subject, message);
            setEmailSent(true);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="email-form">
            <h3>Interested in {petData.name}?</h3>
            <div>
                <label style={{ display: 'block' }}>Shelter's Email:</label>
                <input type="email" value={petData.contact.email} readOnly />
                <label>Your Email:</label>
                <input type="email" value={storedUser.attributes.email} readOnly />
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
