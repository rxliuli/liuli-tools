var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deny } from './deny';
import { isEmpty } from '../string/isEmpty';
/**
 * @test {deny}
 */
describe('test deny', () => {
    it('simple example', () => {
        const fn = deny(isEmpty);
        expect(fn()).toBeFalse();
        expect(fn(undefined)).toBeFalse();
        expect(fn(null)).toBeFalse();
        expect(fn('')).toBeFalse();
        expect(fn(' ')).toBeTrue();
        expect(fn('a')).toBeTrue();
    });
    it('test async function', () => __awaiter(this, void 0, void 0, function* () {
        const asyncIsEmpty = (str) => __awaiter(this, void 0, void 0, function* () { return isEmpty(str); });
        const fn = deny(asyncIsEmpty);
        expect(yield fn()).toBeFalse();
        expect(yield fn(undefined)).toBeFalse();
        expect(yield fn(null)).toBeFalse();
        expect(yield fn('')).toBeFalse();
        expect(yield fn(' ')).toBeTrue();
        expect(yield fn('a')).toBeTrue();
    }));
});
