import { toString } from './toString';
/**
 * @test {toString}
 */
describe('test toString', () => {
    it('simple example', () => {
        expect(toString(1)).toBe('1');
        const user = { name: 'rx', age: 17 };
        expect(toString(user)).toBe(user.toString());
        // @ts-ignore
        expect(toString()).toBe('');
        expect(toString(undefined)).toBe('');
        expect(toString(null)).toBe('');
        const symbol = Symbol('1');
        expect(toString(symbol)).toBe(symbol.toString());
        const now = new Date();
        expect(toString(now)).toBe(now.toISOString());
    });
});
