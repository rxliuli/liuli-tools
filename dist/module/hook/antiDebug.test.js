var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { antiDebug } from './antiDebug';
import { wait } from '../function/wait';
/**
 * @test {antiDebug}
 */
describe('test antiDebug', () => {
    const { cyclingDebugger, checkDebug, disableConsoleOutput } = antiDebug;
    it('test cyclingDebugger', () => {
        cyclingDebugger();
    });
    it.skip('test checkDebug', () => __awaiter(this, void 0, void 0, function* () {
        checkDebug(() => console.log('正在 debug?'));
        yield wait(1000);
        function sleep(milliSeconds) {
            const end = Date.now() + milliSeconds;
            while (Date.now() < end) { }
        }
        sleep(3000);
    }));
    it('test disableConsoleOutput', () => {
        // 未禁用之前应该可以在控制台打印了 abc
        console.log('abc');
        disableConsoleOutput();
        // 仅用了之后就看不到了
        console.log('abc');
    });
});
