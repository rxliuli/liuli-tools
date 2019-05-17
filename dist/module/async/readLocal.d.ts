/**
 * 读取本地浏览器选择的文件
 * @param {File} file 选择的文件
 * @param {Object} option 可选项参数
 * @param { readLocal.DataURL | readLocal.Text | readLocal.BinaryString | readLocal.ArrayBuffer } [option.type=readLocal.DataURL] 读取的类型，默认按照二进制 url 读取
 * @param {String} [option.encoding='UTF-8'] 读取的编码格式，默认为 UTF-8
 * @returns {Promise} 返回了读取到的内容（异步）
 */
export declare function readLocal(file: any, { type, encoding }?: {
    type?: string | undefined;
    encoding?: string | undefined;
}): Promise<{}>;
export declare namespace readLocal {
    var DataURL: string;
    var Text: string;
    var BinaryString: string;
    var ArrayBuffer: string;
}
//# sourceMappingURL=readLocal.d.ts.map