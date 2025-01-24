const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, service, message } = req.body;

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, // SSL
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address
            pass: process.env.EMAIL_PASS, // Your Gmail app password
        },
    });

    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to: process.env.EMAIL_TO, // Recipient's email address
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});