import { objectToMap } from './objectToMap';
/**
 * @test {objectToMap}
 */
describe('test objectToMap', () => {
    it('simple example', () => {
        expect(objectToMap({
            name: 'rx',
            age: 17,
            1: 1,
        })).toEqual(new Map()
            .set('name', 'rx')
            .set('age', 17)
            .set('1', 1));
    });
});
