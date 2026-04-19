export interface AuthorizationOptions {
    hasRole: Array<"admin" | "owner" | "user">;
    allowSameUser?: boolean;
}