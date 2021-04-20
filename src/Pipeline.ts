import { Directive, end } from './directive';
import { Middleware, MiddlewareContext, MiddlewareReturn } from './Middleware';

/**
 * The `Pipeline` class runs a series of `Middleware` async functions.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export class Pipeline<CONTEXT = {}, VALUE = void, NEXTCONTEXT = CONTEXT, RESULT = VALUE> {
    middlewares: Middleware<any, any, any>[] = [];

    async run(context: CONTEXT, value: VALUE): Promise<Directive<RESULT>> {
        let result: any = value;
        for (let index = 0, length = this.middlewares.length; index < length; index++) {
            result = await this.middlewares[index](context, result);
            if (result instanceof Directive) {
                break;
            }
        }
        if (!(result instanceof Directive)) {
            result = end(result);
        }
        return result;
    }

    /**
     * Adds a `Middleware` function to the `Pipeline`
     * @param middleware - a `Middleware` function to add
     */
    use(middleware: Middleware<NEXTCONTEXT, RESULT, RESULT>): this;

    use<MIDDLEWARECONTEXT, MIDDLEWARERETURN = RESULT>(
        middleware: Middleware<NEXTCONTEXT & Partial<MIDDLEWARECONTEXT>, RESULT, MIDDLEWARERETURN>
    ): Pipeline<CONTEXT, VALUE, NEXTCONTEXT & MIDDLEWARECONTEXT, MIDDLEWARERETURN>;

    use<MIDDLEWARE extends Middleware<any, any, any>>(
        middleware: MIDDLEWARE
    ): Pipeline<CONTEXT, VALUE, NEXTCONTEXT & MiddlewareContext<MIDDLEWARE>, MiddlewareReturn<MIDDLEWARE>>;

    use(middleware: any): any {
        this.middlewares.push(middleware);
        return this as any;
    }

    /**
     * Removes a `Middleware` function from the `Pipeline`
     * @param middleware - a `Middleware` function to remove
     */
    remove(middleware: Middleware<any, any, any>) {
        const index = this.middlewares.indexOf(middleware);
        if (index >= 0) {
            return this.middlewares.splice(index, 1);
        } else {
            return [];
        }
    }
}
