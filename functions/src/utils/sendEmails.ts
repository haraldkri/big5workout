import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import fillEmailTemplate from "../templates/fillEmailTemplate";
import ServiceGroupAccount from "../../../credentials/big5workoutServiceGroup.json";
import ServiceEmailAccount from "../../../credentials/serviceEmailAccount.json";

const toEmail = ServiceGroupAccount.email;

export async function sendEmail(userEmail: string, userName: string, subject: string, message: string) {
    // https://nodemailer.com/smtp/oauth2/#oauth-2lo
    // https://medium.com/@this.jiyun/how-to-send-emails-in-next-js-with-nodemailer-gmail-using-typescript-52aeea4e640a
    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false, // true for 465, false for other ports
        auth: {
            user: ServiceEmailAccount.email,
            pass: ServiceEmailAccount.pass,
        }
    });

    const mailOptions: Mail.Options = {
        from: `Big5Workout-Contact <${ServiceEmailAccount.email}>`,
        to: toEmail,
        subject: `Big5Workout Contact - ${subject}`,
        html: fillEmailTemplate(userName, userEmail, subject, message),
    };
    console.info("Sending email ", mailOptions, " to ", toEmail);
    await mailTransport.sendMail(mailOptions);

    return;
}