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
  userEmail: "userId@test.com",
  _id: "id",
  estimatedDuration: 1,
}
