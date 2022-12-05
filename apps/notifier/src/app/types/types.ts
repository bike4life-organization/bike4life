export enum EventType {
    USER_CREATED = 'UserCorrectlyCreated',
    ROUTE_OPTIMIZED = 'RouteOptimizedNotification'
}

export interface EventData {
    route_id: string,
    user_id: string, 
    user_email: string
}