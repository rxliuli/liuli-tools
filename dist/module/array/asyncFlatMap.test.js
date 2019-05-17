var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { range } from './range';
import { asyncFlatMap } from './asyncFlatMap';
/**
 * @test {asyncFlatMap}
 */
describe('test asyncFlatMap', () => {
    it('simple example', () => __awaiter(this, void 0, void 0, function* () {
        expect(yield asyncFlatMap(range(1, 4), (i) => __awaiter(this, void 0, void 0, function* () { return range(1, i + 1); }))).toIncludeAllMembers([1, 1, 2, 1, 2, 3]);
    }));
});
