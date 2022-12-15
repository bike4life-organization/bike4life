import * as nunjucks from "nunjucks";

class NunjucksService {
  obtainTemplate(file: string, data: any): string {
    const myFiles = __dirname + "/app/views";
    nunjucks.configure(myFiles, { autoescape: true });
    return nunjucks.render(file, data);
  }
}

const nunjucksService = new NunjucksService();
export default nunjucksService;
