
export interface UserCreatedEventMessage {
  user_id: string;
  user_email: string;
}

export interface RouteOptimizedEventMessage {
  route_id: string;
  user_id: string;
  user_email: string;
}

export interface RouteCreatedEventMessage {
  route_id: string;
  user_id: string;
  user_email: string;
}
