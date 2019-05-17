import { assign } from './assign';
/**
 * @test {assign}
 */
describe('test assign', () => {
    it('simple example', () => {
        const res = assign({
            name: 'rx',
            hello() {
                return this.name;
            },
        }, {
            name: '琉璃',
            hello: undefined,
        });
        expect(res.name).toEqual('琉璃');
        expect(res.hello()).toEqual('琉璃');
    });
    it('test undefined or null', () => {
        const res = assign(undefined, {
            name: 'rx',
            hello() {
                return this.name;
            },
        }, null, {
            name: '琉璃',
            hello: undefined,
        });
        expect(res.name).toEqual('琉璃');
        expect(res.hello()).toEqual('琉璃');
    });
});
