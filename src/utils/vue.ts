
import { toRefs, isReactive } from "vue"

export const tryToRefs = <T extends object>(obj: T) => isReactive(obj) ? toRefs(obj) : obj