import { isNullOrUndefined } from '../obj/isNullOrUndefined';
/**
 * 数组校验器
 */
export class ArrayValidator {
    /**
     * 是否为空数组
     * @param {Array} array 空数组
     * @returns {Boolean} 是否为空数组
     */
    isEmpty(array) {
        return (isNullOrUndefined(array) ||
            !(array instanceof Array) ||
            array.length === 0);
    }
}
/**
 * 导出一个默认的数组校验对象
 */
export const arrayValidator = new ArrayValidator();
