import { EventData, EventType } from "../types/types";
import nunjucksService from "./nunjucks.service";
import sendGridService from "./sendgrid.service";

class PullListenerService {

    async handleEvents(type: string, event: EventData) {
        if(EventType.USER_CREATED === type ) {
            const template = nunjucksService.obtainTemplate();
            console.log(`type.....`, template)

            const subject = "User Create correctly";
            await sendGridService.sendEmail(subject, event.user_email)
            return;
        }
        if(EventType.ROUTE_OPTIMIZED === type){
            return;
        }
    }

}

const pullListenerService = new PullListenerService();
export default pullListenerService;