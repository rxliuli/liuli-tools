export class CSVExportUtil {
  static listToCSV<T>(arr: T[], fields: (keyof T)[]) {
    return arr.reduce(
      (res, row) =>
        res +
        fields.reduce(
          (temp, field, i) =>
            temp + row[field] + (i === fields.length - 1 ? '' : ','),
          '',
        ) +
        '\n',
      '',
    )
  }

  static exportByBlob<T>(
    arr: T[],
    titles: {
      field: keyof T
      label: string
    }[],
  ): string {
    const BomFirst = '\ufeff'
    const titleRow = titles.reduce((obj, { field, label }) => {
      obj[field] = label
      return obj
    }, {} as Record<keyof T, string>)

    const fields = titles.map(({ field }) => field)
    const title = CSVExportUtil.listToCSV([titleRow as any], fields)
    const content = CSVExportUtil.listToCSV(arr, fields)

    const blob = new Blob([BomFirst + title + content], {
      type: 'text/csv;charset=utf-8;',
    })
    return URL.createObjectURL(blob)
  }

  static exportByDataUri<T>(arr: T[], fields: (keyof T)[]): string {
    //TODO 未实现
    return ''
  }
}
