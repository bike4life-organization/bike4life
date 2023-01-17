import { routeCreatedHandler } from "../../app/handlers/route-created";
import nunjucksService from "../../app/services/nunjucks.service";
import sendGridService from "../../app/services/sendgrid.service";

describe("routeCreatedHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email with the correct template and data", async () => {
    const payload = {
      route_id: "1",
      user_id: "1",
      user_email: "test@gmail.com",
    };
    const expectedTemplate = "routeCreatedCorrectly.html";
    const expectedSubject = "Your route has been created";
    const expectedEventType = "ROUTE_CREATED";

    nunjucksService.obtainTemplate = jest.fn().mockReturnValue("template");
    sendGridService.sendEmailWithTemplate = jest.fn();
    await routeCreatedHandler(payload);
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
    await expect(routeCreatedHandler(payload)).rejects.toThrowError(
      "Invalid payload"
    );
  });
});
