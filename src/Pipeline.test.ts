import { exit, ExitDirective } from './directive';
import { Pipeline } from './Pipeline';

describe('Pipeline', function () {
    describe('run', function () {
        it('should run middleware', async function () {
            const pipeline = new Pipeline().use(async () => {
                return true;
            });
            const { value } = await pipeline.run({}, undefined);
            expect(value).toBe(true);
        });

        it('should run middleware in order', async function () {
            const pipeline = new Pipeline<Record<string, unknown>, string, string>()
                .use(
                    async (_context, value: string): Promise<string> => {
                        return `${value}b`;
                    }
                )
                .use(async (_context, value: string) => {
                    return `${value}c`;
                });
            const { value } = await pipeline.run({}, 'a');
            expect(value).toBe('abc');
        });

        it('should throw exceptions', async function () {
            const pipeline = new Pipeline<any, string, string>()
                .use(async () => {
                    // eslint-disable-next-line no-throw-literal
                    throw 'exception';
                })
                .use(async () => {
                    return 'success';
                });
            await expect(pipeline.run({}, 'a')).rejects.toMatch('exception');
        });
    });

    describe('use', function () {
        it('should add middleware', function () {
            const pipeline = new Pipeline();
            const middleware = async () => {};
            pipeline.use(middleware);
            expect(pipeline.middlewares.length).toBe(1);
            expect(pipeline.middlewares[0]).toBe(middleware);
        });
    });

    describe('remove', function () {
        it('should remove middleware', function () {
            const pipeline = new Pipeline();
            const middleware = async () => {};
            pipeline.use(middleware);
            pipeline.remove(middleware);
            expect(pipeline.middlewares.length).toBe(0);
        });

        it('should handle non-contained middleware', function () {
            const pipeline = new Pipeline();
            const middleware = async () => {};
            pipeline.remove(middleware);
            expect(pipeline.middlewares.length).toBe(0);
        });
    });
});

describe('ExitDirective', function () {
    describe('exit', function () {
        it('should create a new ExitDirective', function () {
            const directive = exit();
            expect(directive).toBeInstanceOf(ExitDirective);
        });
    });
});
