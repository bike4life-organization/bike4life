import { Route } from "../../app/models/route.model";

export const mockRoute: Route = {
  coordinates: [
    [1, 2],
    [3, 4],
  ],
  date: new Date(),
  description: "description",
  name: "name",
  userId: "637a84fe0aea056e2ff60b7a",
  _id: '637a84fe0aea056e2ff60b72',
  estimatedDuration: 1,
}

export const mockPutRoute: Route = {
  coordinates: [
    [1, 2],
    [3, 4],
  ],
  date: new Date(),
  description: "description",
  name: "name",
  userId: "637a84fe0aea056e2ff60b7a",
  estimatedDuration: 1,
}