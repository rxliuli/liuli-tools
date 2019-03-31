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

import { debounce } from './module/function/debounce'
import { returnItself } from './module/function/returnItself'
import { safeExec } from './module/function/safeExec'
import { singleModel } from './module/function/singleModel'
import { StateMachine } from './module/function/StateMachine'
import { throttle } from './module/function/throttle'
import { timing } from './module/function/timing'
import { wait } from './module/function/wait'
import { waitResource } from './module/function/waitResource'
import { watch } from './module/function/watch'
import { watchObject } from './module/function/watchObject'

import { fill } from './module/string/fill'
import { format } from './module/string/format'
import { isFloat } from './module/string/isFloat'
import { isNumber } from './module/string/isNumber'
import { toLowerCase } from './module/string/toLowerCase'
import { toUpperCase } from './module/string/toUpperCase'
import { blankToNull } from './module/string/blankToNull'

import { emptyAllField } from './module/obj/emptyAllField'
import { blankToNullField } from './module/obj/blankToNullField'
import { mapToObject } from './module/obj/mapToObject'

import { randomInt } from './module/number/randomInt'

/**
 * 全局导出的对象，用于浏览器中使用的全局变量 rx
 */
const rx = {
  download,
  downloadString,
  downloadUrl,
  getCookies,
  loadResource,
  parseUrl,
  readLocal,
  spliceParams,
  fetchTimeout,
  strToArrayBuffer,
  FetchLimiting,
  asIterator,
  asyncFlatMap,
  flatMap,
  groupBy,
  range,
  toObject,
  uniqueBy,
  arrayToMap,
  dateFormat,
  strToDate,
  copyText,
  createElByString,
  getCusorPostion,
  insertText,
  isEditable,
  lastFocus,
  removeEl,
  removeText,
  setCusorPostion,
  watchEventListener,
  appends,
  deletes,
  sets,
  objToFormData,
  formDataToArray,
  debounce,
  returnItself,
  safeExec,
  singleModel,
  StateMachine,
  throttle,
  timing,
  wait,
  waitResource,
  watch,
  watchObject,
  fill,
  format,
  isFloat,
  isNumber,
  toLowerCase,
  toUpperCase,
  blankToNull,
  emptyAllField,
  blankToNullField,
  mapToObject,
  randomInt
}

module.exports = rx
export default rx
