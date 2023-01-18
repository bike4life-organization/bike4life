import {
  NotifierMessageTypes,
  RouteOptimizedEventMessage,
} from "@bike4life/commons";
import nunjucksService from "../services/nunjucks.service";
import sendGridService from "../services/sendgrid.service";

function isRouteOptimizedEventMessage(
  message: unknown
): message is RouteOptimizedEventMessage {
  return (
    typeof message === "object" &&
    message !== null &&
    "route_id" in message &&
    "user_id" in message &&
    "user_email" in message
  );
}

export async function routeOptimizedHandler(payload: unknown) {
  if (!isRouteOptimizedEventMessage(payload)) {
    throw new Error("Invalid payload");
  }
  const subject = "Your route has been optimized";
  const emailTemplate = "routeOptimizedCorrectly.html";
  const template = nunjucksService.obtainTemplate(emailTemplate, payload);

  await sendGridService.sendEmailWithTemplate(
    subject,
    payload,
    template,
    NotifierMessageTypes.ROUTE_OPTIMIZED
  );
}
