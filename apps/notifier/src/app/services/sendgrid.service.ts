import { NotifierMessageTypes, logger } from "@bike4life/commons";
import { MailService } from "@sendgrid/mail";
import { EventType } from "../handlers";
import { sendgridSettings as sd } from "../settings";
import mailService from "./mail.service";

class SendGridService {
  async sendEmailWithTemplate(
    subject: string,
    payload: any,
    template: string,
    type: NotifierMessageTypes
  ) {
    const sgMail = new MailService();
    sgMail.setApiKey(sd.SENDGRID_API_KEY);

    const { user_email, user_id, route_id } = payload;

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
    } finally {
      await mailService.create({
        userId: user_id,
        routeId: route_id,
        userMail: user_email,
        messagetype: type,
      });
    }
  }
}

const sendGridService = new SendGridService();
export default sendGridService;
