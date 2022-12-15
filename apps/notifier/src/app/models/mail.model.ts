import { Mail } from "@bike4life/commons";
import { Schema, model } from "mongoose";

const MailSchema = new Schema<Mail>({
  messagetype: {
    type: String,
  },
  userId: {
    type: String,
  },
  routeId: {
    type: String,
  },
  userMail: {
    type: String,
  },
});

export const MailModel = model<Mail>("Mail", MailSchema);
