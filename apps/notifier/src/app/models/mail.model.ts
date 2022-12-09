import { Schema, model } from "mongoose";

export interface MailModel {
  messagetype: string;
  userId: number;
  routeId: number;
  userMail: number;
}

const MailSchema = new Schema<MailModel>({
  messagetype: {
    type: String,
  },
  userId: {
    type: Number,
  },
  routeId: {
    type: Number,
  },
  userMail: {
    type: Number,
  },
});

export const Mail = model<MailModel>("Mail", MailSchema);
