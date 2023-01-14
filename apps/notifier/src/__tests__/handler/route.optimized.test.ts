import { routeOptimizedHandler } from "../../app/handlers/route-optimized";
import nunjucksService from "../../app/services/nunjucks.service";
import sendGridService from "../../app/services/sendgrid.service";
describe("routeOptimizedHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email with the correct template and data", async () => {
    const payload = {
      route_id: "1",
      user_id: "1",
      user_email: "test@gmail.com",
    };
    const expectedTemplate = "routeOptimizedCorrectly.html";
    const expectedSubject = "Your route has been optimized";
    const expectedEventType = "RouteOptimizedNotification";

    nunjucksService.obtainTemplate = jest.fn().mockReturnValue("template");
    sendGridService.sendEmailWithTemplate = jest.fn();
    await routeOptimizedHandler(payload);
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
    await expect(routeOptimizedHandler(payload)).rejects.toThrowError(
      "Invalid payload"
    );
  });
});
