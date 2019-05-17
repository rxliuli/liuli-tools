import { deepProxy } from './deepProxy';
/**
 * @test {deepProxy}
 */
describe('test deepProxy', () => {
    it('simple example', () => {
        const obj = {
            name: 'rx',
        };
        const proxy = deepProxy(obj);
        const type = 'object';
        expect(typeof proxy.a).toBe(type);
        expect(typeof proxy.a.b).toBe(type);
        expect(typeof proxy.a.b.c).toBe(type);
        expect(proxy.name).toBe('rx');
        expect(proxy.name.name).toBeUndefined();
        expect(() => proxy.name.name.name).toThrowError();
    });
});
