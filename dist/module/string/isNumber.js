import { stringValidator } from './stringValidator';
/**
 * 判断字符串是否位整数
 * @param {String} str 需要进行判断的字符串
 * @returns {Boolean} 是否为小数
 * @deprecated 已废弃，请使用 {@link stringValidator#isInteger}
 */
export function isNumber(str) {
    return stringValidator.isInteger(str);
}
