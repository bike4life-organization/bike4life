import sendGridService = require("../../app/services/sendgrid.service");
import { MailService } from "@sendgrid/mail";
jest.mock("@sendgrid/mail");

describe("SendGrid Service", () => {
  it("should send email with template", async () => {
    // mock the payload
    const payload = {
      user_email: "test@example.com",
      user_id: "123",
      route_id: "456",
    };

    // mock the template
    const template = "<p>Hello,</p> <p>Test email</p>";

    // mock the event type
    const type = "test";

    // mock the send method
    MailService.send.mockResolvedValue(null);

    // call the sendEmailWithTemplate method
    await sendGridService.sendEmailWithTemplate(
      "Test Subject",
      payload,
      template,
      type
    );

    // assert that the send method was called
    expect(MailService.send).toHaveBeenCalled();
  });
});
