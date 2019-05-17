import { getObjectKeys } from './getObjectKeys';
/**
 * @test {getObjectKeys}
 */
describe('test getObjectKeys', () => {
    it('simple example', () => {
        const symbol = Symbol('name');
        const name = 'name';
        expect(getObjectKeys({
            [symbol]: name,
            [name]: symbol,
        })).toIncludeAllMembers([symbol, name]);
    });
    it('test boundary situation', () => {
        expect(getObjectKeys({})).toIncludeAllMembers([]);
        expect(getObjectKeys(undefined)).toIncludeAllMembers([]);
        expect(getObjectKeys(null)).toIncludeAllMembers([]);
    });
});
