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
 * 根据 url 下载二进制资源
 * @param {String} url 下载请求信息
 * @param {String} [filename] 下载文件名，没有则默认为链接中的文件名
 */
export function downloadUrl(url, filename = url.substr(url.lastIndexOf('/'))) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url);
            const blob = yield res.blob();
            download(blob, filename);
        }
        catch (error) {
            return console.log('下载出错了 ', error);
        }
    });
}
