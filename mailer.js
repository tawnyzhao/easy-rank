const nodemailer = require('nodemailer');
const config = require('./config.json');

const sendEmail = async (content, imagePath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: config.mailer.auth
    });
    const { fromEmail, toEmail } = config.mailer.options;
    return transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: "WaterlooWorks Rankings are out!",
        html: `<p> Text:${content} <br> Embedded image: <br> <img src="cid:yourresult"/> </p>`,
        attachments: [{
            filename: 'result.png',
            path: imagePath,
            cid: 'yourresult' //same cid value as in the html img src
        }]
    });
}

module.exports = {
    sendEmail
}