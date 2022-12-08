import { RouteCreatedEventMessage } from "@bike4life/commons";
import nunjucksService from "../services/nunjucks.service";
import sendGridService from "../services/sendgrid.service";

    function isRouteCreatedEventMessage(message: unknown): message is RouteCreatedEventMessage {
        return typeof message === 'object' && message !== null && 'route_id' in message && 'user_id' in message && 'user_email' in message;
      }
      
      export async function routeCreatedHandler(payload: unknown) {
        if (!isRouteCreatedEventMessage(payload)) {
          throw new Error('Invalid payload');
        }
        const subject = 'Your route has been created';
        const emailTemplate = 'routeCreatedCorrectly.html'
        const template = nunjucksService.obtainTemplate(emailTemplate, payload);
      
        await sendGridService.sendEmailWithTemplate(subject, payload.user_email, template);
      }
      
