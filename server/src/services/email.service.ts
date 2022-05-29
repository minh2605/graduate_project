import nodemailer from "nodemailer";
import { envConfig } from "../config/config";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(envConfig.email.smtp);

// point to the template folder
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve("src/views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("src/views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

// send mail with defined transport object
const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  template: string,
  context: object
) => {
  const msg = {
    from: envConfig.email.from,
    to,
    subject,
    text,
    template,
    context,
  };
  transporter.sendMail(msg);
};

const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:3000/public/reset-password?token=${token}`;
  const text = `Dear user,
    To reset your password, click on this link: ${resetPasswordUrl}
    If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text, "forgotPassword", {
    name: "Minh Tran Chi",
    url: resetPasswordUrl,
  });
};

const emailServices = {
  sendEmail,
  sendResetPasswordEmail,
};

export default emailServices;
