export enum EventType {
    USER_CREATED = 'UserCorrectlyCreated',
    ROUTE_OPTIMIZED = 'RouteOptimizedNotification'
}

export enum SubjectType {
    USER_CREATED = "User Create correctly",
    ROUTE_OPTIMIZED = "Route optimized correctly"
}

export enum FilenameType {
    USER_CREATED = "usersCreatedCorrectly.html",
    ROUTE_OPTIMIZED = "routeOptimizedCorrectly.html"
}

export interface EventData {
    route_id: string,
    user_id: string, 
    user_email: string
}