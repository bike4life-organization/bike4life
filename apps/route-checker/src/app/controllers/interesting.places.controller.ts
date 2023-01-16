import { checkError } from "@bike4life/commons";
import { NextFunction, Response, Request } from "express";
import interestingPlacesService from "../services/interesting.places.service";

class InterestingPlacesController {

    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const places = await interestingPlacesService.listInterestingPlaces(id)
            res.send(places)
        } catch (error) {
            const validatedError = checkError(error)
            next(validatedError);
        }
    }
}

export default InterestingPlacesController;
