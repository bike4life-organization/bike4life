jest.mock("@sendgrid/mail");
import { MailService } from "@sendgrid/mail";

// mock the send method
MailService.prototype.send = jest.fn()
MailService.prototype.setApiKey = jest.fn()

import sendGridService from "../../app/services/sendgrid.service";
import { NotifierMessageTypes } from '@bike4life/commons'
import { NotificationModel } from '../../app/models/notification.model'
import { mockNotification } from '../support/notification'

describe("SendGrid Service", () => {
  it("should send email with template", async () => {
    jest.spyOn(NotificationModel, 'create').mockImplementationOnce(async () => {
      return mockNotification
    });
    // mock the payload
    const payload = {
      user_email: "test@example.com",
      user_id: "123",
      route_id: "456",
    };

    // mock the template
    const template = "<p>Hello,</p> <p>Test email</p>";

    // mock the event type
    const type = NotifierMessageTypes.ROUTE_CREATED

    // call the sendEmailWithTemplate method
    await sendGridService.sendEmailWithTemplate(
      "Test Subject",
      payload,
      template,
      type
    );

    // assert that the send method was called
    expect(MailService.prototype.setApiKey).toHaveBeenCalled()
    expect(MailService.prototype.send).toHaveBeenCalled();
  });
});
