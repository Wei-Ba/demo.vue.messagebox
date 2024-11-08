import { noop } from "./common"

const getPrototypeName = (val: unknown) => Object.prototype.toString.call(val)
const FunctionToken = getPrototypeName(noop)

export const isString = (value: any): value is string => typeof value ==='string'
export const isNumber = (value: any): value is number => typeof value === 'number'
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'
export const isFunction = (value: any): value is Function => value && getPrototypeName(value) === FunctionToken

export const isObject = (value: any): value is object => value && typeof value === 'object'
export const isArray = (value: any): value is any[] => Array.isArray(value)

export const isNull = (value: any): value is null => value === null
export const isUndefined = (value: any): value is undefined => value === undefined
export const isNullOrUndefined = (value: any): value is null | undefined => isNull(value) || isUndefined(value)