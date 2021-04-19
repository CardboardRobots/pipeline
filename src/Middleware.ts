/**
 * An interface for Middleware functions.
 *
 * @param context - This is the Context object.
 * @param value - This is the return value of the previous Pipeline stage.
 * @returns - This must return a Promise.  The return value will be passed as the value parameter into the next stage of the Pipeline.
 *
 */
export type Middleware<CONTEXT, VALUE, RESULT> = (context: CONTEXT, value: VALUE) => Promise<RESULT>;

/**
 * Utility type to get the CONTEXT type of a Middleware
 */
export type MiddlewareContext<T> = T extends Middleware<infer U, any, any> ? U : never;

/**
 * Utility type to get the VALUE parameter type of a Middleware
 */
export type MiddlewareValue<T> = T extends Middleware<any, infer U, any> ? U : never;

/**
 * Utility type to get the RETURN type of a Middleware
 */
export type MiddlewareReturn<T> = T extends Middleware<any, any, infer U> ? U : never;
