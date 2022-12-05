import { logger } from "@bike4life/commons";
import { MailService } from "@sendgrid/mail";
import { sendgridSettings as sd } from "../settings";

class SendGridService {
  async sendEmailWithTemplate(
    subject: string,
    user_email: string,
    template: string
  ) {
    const sgMail = new MailService();
    sgMail.setApiKey(sd.SENDGRID_API_KEY);

    const msg = {
      to: user_email,
      from: sd.TO_REPLY_TO_EMAIL_SENDGRID,
      reply_to: sd.TO_REPLY_TO_EMAIL_SENDGRID,
      subject: subject,
      html: template,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      logger.error({ error: error });
    }
  }
}

const sendGridService = new SendGridService();
export default sendGridService;
