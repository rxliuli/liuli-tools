import download from './module/ajax/download'
import downloadString from './module/ajax/downloadString'
import downloadUrl from './module/ajax/downloadUrl'
import getCookies from './module/ajax/getCookies'
import loadResource from './module/ajax/loadResource'
import parseUrl from './module/ajax/parseUrl'
import readLocal from './module/ajax/readLocal'
import spliceParams from './module/ajax/spliceParams'
import fetchTimeout from './module/ajax/fetchTimeout'
// import FetchLimiting from './module/ajax/FetchLimiting'

import asIterator from './module/array/asIterator'
import asyncFlatMap from './module/array/asyncFlatMap'
import flatMap from './module/array/flatMap'
import groupBy from './module/array/groupBy'
import range from './module/array/range'
import toObject from './module/array/toObject'
import uniqueBy from './module/array/uniqueBy'

import dateFormat from './module/date/dateFormat'
import strToDate from './module/date/strToDate'

import createElByString from './module/dom/createElByString'
import getCusorPostion from './module/dom/getCusorPostion'
import insertText from './module/dom/insertText'
import isEditable from './module/dom/isEditable'
import lastFocus from './module/dom/lastFocus'
import removeEl from './module/dom/removeEl'
import removeText from './module/dom/removeText'
import setCusorPostion from './module/dom/setCusorPostion'

import watchEventListener from './module/event/watchEventListener'

import appends from './module/formdata/appends'
import deletes from './module/formdata/deletes'
import sets from './module/formdata/sets'
import toArray from './module/formdata/toArray'

import debounce from './module/function/debounce'
import returnItself from './module/function/returnItself'
import throttle from './module/function/throttle'
import timing from './module/function/timing'
import wait from './module/function/wait'
import waitResource from './module/function/waitResource'

import fill from './module/string/fill'
import format from './module/string/format'
import toLowerCase from './module/string/toLowerCase'
import toUpperCase from './module/string/toUpperCase'

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
  // FetchLimiting,
  asIterator,
  asyncFlatMap,
  flatMap,
  groupBy,
  range,
  toObject,
  uniqueBy,
  dateFormat,
  strToDate,
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
  toArray,
  debounce,
  returnItself,
  throttle,
  timing,
  wait,
  waitResource,
  fill,
  format,
  toLowerCase,
  toUpperCase
}

export default rx
