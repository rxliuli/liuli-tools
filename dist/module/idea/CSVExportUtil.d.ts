export declare class CSVExportUtil {
    static listToCSV<T>(arr: T[], fields: (keyof T)[]): string;
    static exportByBlob<T>(arr: T[], titles: {
        field: keyof T;
        label: string;
    }[]): string;
    static exportByDataUri<T>(arr: T[], fields: (keyof T)[]): string;
}
//# sourceMappingURL=CSVExportUtil.d.ts.map