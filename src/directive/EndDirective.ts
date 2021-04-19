import { DirectiveType } from './DirectiveType';
import { Directive } from './Directive';

/**
 * This Directive indicates a completed Pipeline.
 */
export class EndDirective<T> extends Directive<T> {
    constructor(value: T) {
        super(DirectiveType.End, value);
    }
}

/**
 * Returns a `EndDirective` object
 */
export function end(): EndDirective<void>;
export function end<T>(value: T): EndDirective<T>;
export function end<T>(value?: T) {
    return new EndDirective(value);
}
