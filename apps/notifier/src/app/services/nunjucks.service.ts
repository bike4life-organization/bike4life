import * as nunjucks from "nunjucks";
import { EventData } from "../types/types";

class NunjucksService {
  obtainTemplate(file: string, data: EventData) {
    const myFiles = __dirname + "/assets/views";
    nunjucks.configure(myFiles, { autoescape: true });
    return nunjucks.render(file, data);
  }
}

const nunjucksService = new NunjucksService();
export default nunjucksService;
