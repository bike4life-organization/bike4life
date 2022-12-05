import * as nunjucks from "nunjucks";

class NunjucksService {
  obtainTemplate(file: string) {
    const myFiles = __dirname + "/assets/views";
    nunjucks.configure(myFiles, { autoescape: true });
    return nunjucks.render(file);
  }
}

const nunjucksService = new NunjucksService();
export default nunjucksService;
