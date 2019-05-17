var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { repeatedCall } from './repeatedCall';
/**
 * @test {repeatedCall}
 */
describe('test repeatedCall', () => {
    it('simple example', () => {
        let i = 1;
        expect(repeatedCall(5, () => i++)).toIncludeSameMembers([1, 2, 3, 4, 5]);
        expect(i).toBe(6);
    });
    it('async function', () => __awaiter(this, void 0, void 0, function* () {
        let i = 1;
        const arr = repeatedCall(5, () => __awaiter(this, void 0, void 0, function* () { return i++; }));
        expect(arr).toSatisfyAll(res => res instanceof Promise);
        yield Promise.all(arr);
        expect(i).toBe(6);
    }));
    it('test this', function () {
        this.i = 1;
        expect(repeatedCall(5, () => this.i++)).toIncludeSameMembers([
            1,
            2,
            3,
            4,
            5,
        ]);
        expect(this.i).toBe(6);
    });
    it('test bind this', function () {
        const obj = { i: 1 };
        expect(repeatedCall(5, function () {
            return this.i++;
        }.bind(obj))).toIncludeSameMembers([1, 2, 3, 4, 5]);
        expect(obj.i).toBe(6);
    });
});
