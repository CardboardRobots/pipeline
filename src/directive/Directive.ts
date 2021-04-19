/**
 * The Directive class, when returned from a Middleware function, signals that the Pipeline should exit.
 */
export class Directive<T> {
    type: string;
    value: T;
    constructor(type: string, value: T) {
        this.type = type;
        this.value = value;
    }
}
