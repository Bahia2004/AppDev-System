const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to any email provider
    auth: {
        user: 'aash100227@gmail.com',  // Your email
        pass: 'ewir gyae wofs hali'    // Your password or an app-specific password
    }
});

// Function to send an email
async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'aash100227@gmail.com',  // Your email
        to: to,  
        subject: subject, 
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
