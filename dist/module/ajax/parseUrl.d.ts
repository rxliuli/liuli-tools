/**
 * Url 对象
 */
interface IUrlObject {
    /**
     * href 不包含网站域名的链接
     */
    href: string;
    /**
     * website URL 站点
     */
    website: string;
    /**
     * protocol 协议
     */
    protocol: string;
    /**
     * domain 域名
     */
    domain: string;
    /**
     * accessPath 绝对路径,不包含参数
     */
    accessPath: string;
    /**
     * params 参数列表,
     */
    params: Map<string, string | string[]>;
    /**
     * url 原 url 链接
     */
    url: string;
    /**
     * port 端口号
     */
    port: number;
}
/**
 * 解析 url 字符串
 * @param url url 字符串，不能为空
 * @returns url 对象
 * @deprecated 请使用原生 API URL 类，可以通过 new URL(url) 将 URL 字符串转换为 URL 对象，并获取指定的信息
 */
export declare function parseUrl(url: string): IUrlObject | null;
export {};
//# sourceMappingURL=parseUrl.d.ts.map