var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { download } from './download';
/**
 * 在浏览器上下载文本内容
 * @param {String} str 字符串内容
 * @param {String} [filename='unknown.txt'] 下载文件名，没有则默认为链接中的文件名
 */
export function downloadString(str, filename = 'unknown.txt') {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = new Blob([str], {
            type: 'text/plain',
        });
        download(blob, filename);
    });
}
