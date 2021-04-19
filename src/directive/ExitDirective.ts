import { DirectiveType } from './DirectiveType';
import { Directive } from './Directive';

/**
 * This Directive indicates an early exit from the Pipeline.
 */
export class ExitDirective<T> extends Directive<T> {
    constructor(value: T) {
        super(DirectiveType.Exit, value);
    }
}

/**
 * Returns a `ExitDirective` object
 */
export function exit(): ExitDirective<void>;
export function exit<T>(value: T): ExitDirective<T>;
export function exit<T>(value?: T) {
    return new ExitDirective(value);
}
