import { Notification } from "@bike4life/commons";
import { NotificationModel } from "../models/notification.model";

class NotificationDbService {
  async create(notification: Notification): Promise<void> {
    await NotificationModel.create(notification);
  }
}

const notificationDbService = new NotificationDbService();
export default notificationDbService;
