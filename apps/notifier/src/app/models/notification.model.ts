import { Notification } from "@bike4life/commons";
import { Schema, model } from "mongoose";

const NotificationSchema = new Schema<Notification>({
  messageType: {
    type: String,
  },
  payload: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

export const NotificationModel = model<Notification>("Notification", NotificationSchema);
