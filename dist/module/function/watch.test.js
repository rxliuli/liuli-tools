var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { watch } from './watch';
import { wait } from './wait';
/**
 * @test {watch}
 */
describe('test watch', () => {
    it.skip('test watch for simple example', () => {
        let now;
        watch(() => Date.now(), () => {
            expect(Date.now() - now).toBeLessThan(200);
            now = Date.now();
        });
    });
    it('test watch for closing', () => __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        let num = 0;
        const close = watch(() => Date.now(), () => {
            // 大于 100ms 就关闭
            if (Date.now() - start > 100) {
                close();
            }
            num++;
        });
        yield wait(10);
        const temp1 = num;
        yield wait(200);
        const temp2 = num;
        yield wait(100);
        const temp3 = num;
        expect(temp1).not.toBe(temp2);
        expect(temp2).toBe(temp3);
    }));
    it('test watch for dependent on external conditions', () => {
        const interval = 100;
        const max = 10;
        let num = 0;
        const now = Date.now();
        // 随着时间改变 num 的值
        setInterval(() => num++, interval);
        watch(
        // 监视 num 的值
        () => num > max, () => {
            expect(num).toBe(10);
            expect(Date.now() - now).toBeGreaterThan(1000);
        });
    });
    it('test this', function () {
        this.now = 0;
        watch(() => Date.now(), () => {
            expect(Date.now() - this.now).toBeLessThan(1000);
            this.now = Date.now();
        });
    });
});
