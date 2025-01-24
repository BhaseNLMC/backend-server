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
    const mailOptions =