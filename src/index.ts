import { download } from './module/ajax/download'
import { downloadString } from './module/ajax/downloadString'
import { downloadUrl } from './module/ajax/downloadUrl'
import { getCookies } from './module/ajax/getCookies'
import { loadResource } from './module/ajax/loadResource'
import { parseUrl } from './module/ajax/parseUrl'
import { readLocal } from './module/ajax/readLocal'
import { spliceParams } from './module/ajax/spliceParams'
import { fetchTimeout } from './module/ajax/fetchTimeout'
import { strToArrayBuffer } from './module/ajax/strToArrayBuffer'
import { FetchLimiting } from './module/ajax/FetchLimiting'
import { asIterator } from './module/array/asIterator'
import { asyncFlatMap } from './module/array/asyncFlatMap'
import { flatMap } from './module/array/flatMap'
import { groupBy } from './module/array/groupBy'
import { range } from './module/array/range'
import { toObject } from './module/array/toObject'
import { uniqueBy } from './module/array/uniqueBy'
import { arrayToMap } from './module/array/arrayToMap'
import { dateFormat } from './module/date/dateFormat'
import { strToDate } from './module/date/strToDate'
import { copyText } from './module/dom/copyText'
import { createElByString } from './module/dom/createElByString'
import { getCusorPostion } from './module/dom/getCusorPostion'
import { insertText } from './module/dom/insertText'
import { isEditable } from './module/dom/isEditable'
import { lastFocus } from './module/dom/lastFocus'
import { removeEl } from './module/dom/removeEl'
import { removeText } from './module/dom/removeText'
import { setCusorPostion } from './module/dom/setCusorPostion'
import { watchEventListener } from './module/event/watchEventListener'
import { appends } from './module/formdata/appends'
import { deletes } from './module/formdata/deletes'
import { sets } from './module/formdata/sets'
import { formDataToArray } from './module/formdata/formDataToArray'
import { objToFormData } from './module/formdata/objToFormData'
import { debounce } from './module/async/debounce'
import { returnItself } from './module/function/returnItself'
import { safeExec } from './module/function/safeExec'
import { singleModel } from './module/function/singleModel'
import { StateMachine } from './module/function/StateMachine'
import { throttle } from './module/async/throttle'
import { timing } from './module/function/timing'
import { wait } from './module/async/wait'
import { waitResource } from './module/async/waitResource'
import { watch } from './module/function/watch'
import { watchObject } from './module/function/watchObject'
import { fill } from './module/string/fill'
import { format } from './module/string/format'
import { isFloat } from './module/string/isFloat'
import { isNumber } from './module/string/isNumber'
import { toLowerCase } from './module/string/toLowerCase'
import { toUpperCase } from './module/string/toUpperCase'
import { blankToNull } from './module/string/blankToNull'
import { blankToNullField } from './module/obj/blankToNullField'
import { emptyAllField } from './module/obj/emptyAllField'
import { excludeFields } from './module/obj/excludeFields'
import { mapToObject } from './module/obj/mapToObject'
import { randomInt } from './module/number/randomInt'
import { getYearWeek } from './module/date/getYearWeek'
import { dateConstants, DateConstants } from './module/date/DateConstants'
import { dateEnhance } from './module/date/dateEnhance'
import { dateBetween } from './module/date/dateBetween'
import { isRange } from './module/number/isRange'
import { dateParse } from './module/date/dateParse'
import { returnReasonableItself } from './module/function/returnReasonableItself'
import { filterItems } from './module/array/filterItems'
import { arrayDiffBy } from './module/array/arrayDiffBy'
import { autoIncrement } from './module/number/autoIncrement'
import { StringStyleUtil } from './module/string/StringConverter'
import { StringStyleType } from './module/string/StringConverter/StringStyleType'
import { deepFreeze } from './module/obj/deepFreeze'
import { deepProxy } from './module/obj/deepProxy'
import { curry } from './module/function/curry'
import { sortBy } from './module/array/sortBy'
import { DateFormatter } from './module/date/DateFormatter'
import { compose } from './module/function/compose'
import { excludeFieldsDeep } from './module/obj/excludeFieldsDeep'
import { isNullOrUndefined } from './module/obj/isNullOrUndefined'
import { toString } from './module/string/toString'
import { LocalStorageCache } from './module/cache/LocalStorageCache'
import { cacheUtil, CacheUtil } from './module/cache/CacheUtil'
import { antiDebug, AntiDebug } from './module/hack/AntiDebug'
import { isBlank } from './module/string/isBlank'
import { isEmpty } from './module/string/isEmpty'
import { loadScript } from './module/ajax/loadScript'
import { deny } from './module/function/deny'
import { arrayValidator, ArrayValidator } from './module/array/ArrayValidator'
import {
  stringValidator,
  StringValidator,
} from './module/string/StringValidator'
import { pathUtil, PathUtil } from './module/string/PathUtil'
import { logger, Logger } from './module/hack/logger'
import { emptyFunc } from './module/function/emptyFunc'
import { objectToMap } from './module/obj/objectToMap'
import { listToTree } from './module/tree/listToTree'
import { bridge } from './module/function/bridge'
import { treeToList } from './module/tree/treeToList'
import { treeMapping } from './module/tree/treeMapping'
import { INodeBridge } from './module/tree/INodeBridge'
import { nodeBridgeUtil, NodeBridgeUtil } from './module/tree/NodeBridgeUtil'
import { getObjectEntries } from './module/obj/getObjectEntries'
import { getObjectKeys } from './module/obj/getObjectKeys'
import { floatEquals } from './module/number/floatEquals'
import { assign } from './module/obj/assign'
import { aggregation } from './module/obj/aggregation'
import { asyncLimiting } from './module/async/asyncLimiting'
import { Locker } from './module/async/Locker'
import { trySometime } from './module/function/trySometime'
import { trySometimeParallel } from './module/function/trySometimeParallel'
import { compare } from './module/obj/compare'
import { sleep } from './module/function/sleep'
import { AsyncArray } from './module/array/AsyncArray'
import { async } from './module/async/async'
import { findIndex } from './module/array/findIndex'
import {
  CombinedPredicate,
  and,
  or,
  not,
} from './module/function/CombinedPredicate'
import { mergeMap } from './module/async/mergeMap'
import { switchMap } from './module/async/switchMap'
import { once } from './module/function/once'
import { onceOfSameParam } from './module/function/onceOfSameParam'
import { concatMap } from './module/async/concatMap'
import { repeatedCall } from './module/function/repeatedCall'
import { PubSubMachine } from './module/function/PubSubMachine'
import { diffBy } from './module/array/diffBy'
import { extractFieldMap } from './module/array/extractFieldMap'
import { TypeValidator } from './module/obj/TypeValidator'
import { getCursorPosition } from './module/dom/getCursorPosition'
import { setCursorPosition } from './module/dom/setCursorPosition'
import { segmentation } from './module/array/segmentation'
import { toggleClass } from './module/dom/toggleClass'
import { partial } from './module/function/partial'
import { compatibleAsync } from './module/async/compatibleAsync'
import { deepExcludeFields } from './module/obj/deepExcludeFields'
import { EventUtil } from './module/event/EventUtil'
import { loadStyle } from './module/ajax/loadStyle'
import { locationSerialize } from './module/ajax/locationSerialize'
import { get } from './module/idea/get'
import { set } from './module/idea/set'
import { Stopwatch } from './module/date/Stopwatch'
import { remindLeavePage } from './module/hack/remindLeavePage'

/**
 * 全局导出的对象，用于浏览器中使用的全局变量 rx
 */
export {
  download,
  downloadString,
  downloadUrl,
  getCookies,
  loadResource,
  loadScript,
  loadStyle,
  locationSerialize,
  parseUrl,
  readLocal,
  spliceParams,
  fetchTimeout,
  strToArrayBuffer,
  FetchLimiting,
  arrayDiffBy,
  arrayToMap,
  arrayValidator,
  ArrayValidator,
  asIterator,
  AsyncArray,
  asyncFlatMap,
  diffBy,
  extractFieldMap,
  filterItems,
  findIndex,
  flatMap,
  groupBy,
  range,
  segmentation,
  sortBy,
  toObject,
  uniqueBy,
  LocalStorageCache,
  cacheUtil,
  CacheUtil,
  dateFormat,
  dateParse,
  dateConstants,
  DateConstants,
  DateFormatter,
  dateEnhance,
  dateBetween,
  strToDate,
  getYearWeek,
  Stopwatch,
  copyText,
  createElByString,
  getCursorPosition,
  getCusorPostion,
  insertText,
  isEditable,
  lastFocus,
  removeEl,
  removeText,
  setCursorPosition,
  setCusorPostion,
  toggleClass,
  watchEventListener,
  EventUtil,
  appends,
  deletes,
  sets,
  objToFormData,
  formDataToArray,
  debounce,
  deny,
  emptyFunc,
  Locker,
  mergeMap,
  once,
  onceOfSameParam,
  partial,
  PubSubMachine,
  repeatedCall,
  returnItself,
  returnReasonableItself,
  safeExec,
  singleModel,
  sleep,
  StateMachine,
  switchMap,
  throttle,
  timing,
  trySometime,
  trySometimeParallel,
  wait,
  waitResource,
  watch,
  watchObject,
  async,
  asyncLimiting,
  compatibleAsync,
  concatMap,
  bridge,
  CombinedPredicate,
  and,
  or,
  not,
  compose,
  curry,
  blankToNull,
  fill,
  format,
  isBlank,
  isEmpty,
  isFloat,
  isNumber,
  pathUtil,
  PathUtil,
  StringStyleType,
  StringStyleUtil,
  stringValidator,
  StringValidator,
  toLowerCase,
  toString,
  toUpperCase,
  aggregation,
  assign,
  blankToNullField,
  compare,
  deepExcludeFields,
  deepFreeze,
  deepProxy,
  emptyAllField,
  excludeFields,
  excludeFieldsDeep,
  getObjectEntries,
  getObjectKeys,
  isNullOrUndefined,
  mapToObject,
  objectToMap,
  TypeValidator,
  antiDebug,
  AntiDebug,
  Logger,
  logger,
  remindLeavePage,
  get,
  set,
  randomInt,
  isRange,
  autoIncrement,
  floatEquals,
  listToTree,
  treeMapping,
  INodeBridge,
  nodeBridgeUtil,
  NodeBridgeUtil,
  treeToList,
}
