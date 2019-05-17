import { isBlank } from './isBlank';
/**
 * @test {isBlank}
 */
describe('test isBlank', () => {
    it('simple example', () => {
        expect(isBlank(null)).toBeTrue();
        expect(isBlank(undefined)).toBeTrue();
        expect(isBlank('')).toBeTrue();
        expect(isBlank(' ')).toBeTrue();
        expect(isBlank('a')).toBeFalse();
    });
});
