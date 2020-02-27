declare enum ModeType {
    History = 0,
    Hash = 1
}
export declare class LocationSerialize {
    static ModeType: typeof ModeType;
    /**
     * 配置序列化到 URL 上的名字
     */
    ParamName: string;
    mode: ModeType;
    private serializable;
    /**
     * 初始化一个可以自动将修改序列化到 URL 上并在第一次自动从 URL 上取值的函数
     * @param obj
     */
    queryUrlInit<T extends object>(obj: T): any;
}
export declare const locationSerialize: LocationSerialize;
export declare const queryUrlInit: <T extends object>(obj: T) => any;
export {};
//# sourceMappingURL=locationSerialize.d.ts.map