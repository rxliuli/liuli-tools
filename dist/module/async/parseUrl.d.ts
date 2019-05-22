interface IUrlObject {
    href: string;
    website: string;
    protocol: string;
    domain: string;
    accessPath: string;
    params: Map<string, string | string[]>;
    url: string;
    port: number;
}
/**
 * Url 对象
 * @class UrlObject
 */
declare class UrlObject {
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
    /**
     * 构造函数
     * @param option 可选项
     */
    constructor({ href, website, protocol, domain, accessPath, params, url, port, }?: Partial<IUrlObject>);
}
/**
 * 解析 url 字符串
 * @param url url 字符串，不能为空
 * @returns url 对象
 */
export declare function parseUrl(url: string): UrlObject | null;
export {};
//# sourceMappingURL=parseUrl.d.ts.map