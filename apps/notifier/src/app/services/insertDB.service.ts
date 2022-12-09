import { Mail, MailModel } from "../models/mail.model";

class InsertService {
  public createMailRegistry = async (newMail: MailModel) => {
    try {
        Mail m = new Mail();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

const insertService = new InsertService();
export default insertService;
