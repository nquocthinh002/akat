const nodemailer = require('nodemailer');

const sendMail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: true,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_PASSWORD,
        },
    });


    const mailOptions = {
        from: `"AKAT" <no-reply@akat.com>`,
        to: options.email,
        subject: options.subject,
        html: options.html
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = sendMail;