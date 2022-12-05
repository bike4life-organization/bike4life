import * as nunjucks from "nunjucks";

class NunjucksService {

    obtainTemplate() {

        const myFile = __dirname + '/assets/views';
        nunjucks.configure(myFile,{autoescape: true});
        const templateUserCreated = nunjucks.render("hola.html");
        //const templateRouteOptimized = nunjucks.render("routeoptimized.html");

        return templateUserCreated;
    }

}

const nunjucksService = new NunjucksService();
export default nunjucksService; 