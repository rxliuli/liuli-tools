import { ReturnFunc } from '../interface/ReturnFunc';
/**
 * 提醒用户当前页面有正在执行的操作，暂时不能离开
 * 注：用户实际上可以不管该提醒
 * @param fn 谓词，是否要提醒不要关闭
 * @returns 返回删除这个事件监听的函数
 */
export declare function remindLeavePage(fn?: ReturnFunc<boolean>): () => void;
//# sourceMappingURL=remindLeavePage.d.ts.map