jest.mock("@sendgrid/mail");
import { MailService } from "@sendgrid/mail";

MailService.prototype.send = jest.fn();
MailService.prototype.setApiKey = jest.fn();

import sendGridService from "../../app/services/sendgrid.service";
import { NotifierMessageTypes } from "@bike4life/commons";
import { NotificationModel } from "../../app/models/notification.model";
import { mockNotification } from "../support/notification";

describe("SendGrid Service", () => {
  it("should send email with template", async () => {
    jest.spyOn(NotificationModel, "create").mockImplementationOnce(async () => {
      return mockNotification;
    });
    const payload = {
      user_email: "test@example.com",
      user_id: "123",
      route_id: "456",
    };

    const template = "<p>Hello,</p> <p>Test email</p>";

    const type = NotifierMessageTypes.ROUTE_CREATED;

    await sendGridService.sendEmailWithTemplate(
      "Test Subject",
      payload,
      template,
      type
    );

    expect(MailService.prototype.setApiKey).toHaveBeenCalled();
    expect(MailService.prototype.send).toHaveBeenCalled();
  });
});
