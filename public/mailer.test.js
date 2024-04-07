const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

describe('Email sending', () => {
  it('should send email successfully', async () => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: 'healthcare.system.auth@gmail.com',
      to: 'diduh1321@gmail.com',
      subject: 'Test email',
      text: 'This is a test email',
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      expect(info).toBeDefined();
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      expect(error).toBeNull();
    }
  });
});
