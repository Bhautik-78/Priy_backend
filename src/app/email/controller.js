const Email = require('./model');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_PASS
  }
});

async function sendEmail(req, res) {
  const { name, email, phone, subject, message } = req.body;

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: process.env.USER_EMAIL,
    subject: subject,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error sending email');
    }

    try {
      const emailRecord = new Email({
        name,
        email,
        phone,
        subject,
        message
      });
      await emailRecord.save();
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving email record');
    }
  });
}

module.exports = {
  sendEmail
};
