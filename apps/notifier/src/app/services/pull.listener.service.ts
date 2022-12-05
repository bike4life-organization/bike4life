import { EventData, EventType, FilenameType, SubjectType } from "../types/types";
import nunjucksService from "./nunjucks.service";
import sendGridService from "./sendgrid.service";

class PullListenerService {

    async handleEvents(type: string, event: EventData) {
        let [subject, file] = ["", ""]

        if(EventType.USER_CREATED === type ) {
            subject = SubjectType.USER_CREATED;
            file = FilenameType.USER_CREATED;
        }
        if(EventType.ROUTE_OPTIMIZED === type){
            subject = SubjectType.ROUTE_OPTIMIZED;
            file = FilenameType.ROUTE_OPTIMIZED;
        }

        await sendGridService.sendEmailWithTemplate(subject, event.user_email, nunjucksService.obtainTemplate(file))

    }

}

const pullListenerService = new PullListenerService();
export default pullListenerService;