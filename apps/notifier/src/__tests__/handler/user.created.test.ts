import { userCreatedHandler } from "../../app/handlers/user-created";
import nunjucksService from "../../app/services/nunjucks.service";
import sendGridService from "../../app/services/sendgrid.service";

describe("userCreatedHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email with the correct template and data", async () => {
    const payload = { user_id: "1", user_email: "test@gmail.com" };
    const expectedTemplate = "usersCreatedCorrectly.html";
    const expectedSubject = "Welcome to Bike4Life";
    const expectedEventType = "USER_CREATED";

    nunjucksService.obtainTemplate = jest.fn().mockReturnValue("template");
    sendGridService.sendEmailWithTemplate = jest.fn();
    await userCreatedHandler(payload);

    expect(nunjucksService.obtainTemplate).toBeCalledWith(
      expectedTemplate,
      payload
    );
    expect(sendGridService.sendEmailWithTemplate).toBeCalledWith(
      expectedSubject,
      payload,
      "template",
      expectedEventType
    );
  });

  it("should throw an error if the payload is invalid", async () => {
    const payload = { invalid: "data" };
    await expect(userCreatedHandler(payload)).rejects.toThrowError(
      "Invalid payload"
    );
  });
});
