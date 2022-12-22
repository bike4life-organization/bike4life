import {Coordinates} from "../types/types";

export const findMin =
    (field: string, coordinates: Coordinates[]) => Math.min(...coordinates.map(item => item[field]));

export const findMax =
    (field: string, coordinates: Coordinates[]) => Math.max(...coordinates.map(item => item[field]));

