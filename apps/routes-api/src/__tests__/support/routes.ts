import { Route } from "../../app/models/route.model";

export const mockRoute: Route = {
  coordinates: [
    [1, 2],
    [3, 4],
  ],
  date: new Date(),
  description: "description",
  name: "name",
  userId: "userId",
  _id: "id",
  estimatedDuration: 1,
}
