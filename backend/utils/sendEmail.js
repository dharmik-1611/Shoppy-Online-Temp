const nodeMailer = require('nodemailer');
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error, 'error');
        } else {
            console.log('mailsend');
        }
    });
};
module.exports = sendEmail;