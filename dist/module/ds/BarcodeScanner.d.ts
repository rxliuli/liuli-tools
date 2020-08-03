/**
 * 扫码配置
 */
export interface ScannerConfig {
    /**
     * 校验
     * @param key
     */
    validate: (key: string) => boolean;
    interval?: number;
}
/**
 * 条形码扫描
 */
export declare class BarcodeScanner {
    private config;
    constructor(config: ScannerConfig);
    private lastTime?;
    private nextTime?;
    private code;
    private em;
    /**
     * 添加监听
     * @param listener
     */
    on(listener: (code: string) => void): void;
    /**
     * 结束监听
     * @param listener
     */
    off(listener: (code: string) => void): void;
    private listener;
    private num;
    private init;
    private destroy;
}
//# sourceMappingURL=BarcodeScanner.d.ts.map