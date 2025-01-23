const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// Configure your email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Or your email service
  auth: {
    user: process.env.User,
    pass: process.env.Pass  // Use app password for security
  }
});


app.post('/api/send-inquiry', async (req, res) => {
  const { message, email, mobile } = req.body;

  const mailOptions = {
    from: process.env.From,
    to: process.env.To,  // Your email to receive inquiries
    subject: 'New Inquiry Received',
    text: `
      New Inquiry from: ${email}
      Mobile: ${mobile}
      Message:
      ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Inquiry sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send inquiry');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});