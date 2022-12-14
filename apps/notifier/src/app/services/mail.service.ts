import { Mail } from "@bike4life/commons";
import { MailModel } from "../models/mail.model";

class MailService {
  async create(newMail: Mail): Promise<void> {
    const mail: Mail = {
      ...newMail,
    };

    await MailModel.create(mail);
  }
}

const mailService = new MailService();
export default mailService;
