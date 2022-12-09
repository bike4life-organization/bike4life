import { logger, UserCreatedEventMessage } from "@bike4life/commons";
import { EventType } from ".";
import nunjucksService from "../services/nunjucks.service";
import sendGridService from "../services/sendgrid.service";

function isUserCreatedEventMessage(
  message: unknown
): message is UserCreatedEventMessage {
  return (
    typeof message === "object" &&
    message !== null &&
    "user_id" in message &&
    "user_email" in message
  );
}

export async function userCreatedHandler(payload: unknown) {
  if (!isUserCreatedEventMessage(payload)) {
    throw new Error("Invalid payload");
  }
  const subject = "Welcome to Bike4Life";
  const emailTemplate = "usersCreatedCorrectly.html";
  const template = nunjucksService.obtainTemplate(emailTemplate, payload);

  await sendGridService.sendEmailWithTemplate(
    subject,
    payload,
    template,
    EventType.USER_CREATED
  );
}
