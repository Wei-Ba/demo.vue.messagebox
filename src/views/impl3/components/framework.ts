import { computed, shallowReactive, type InjectionKey, type VNode } from 'vue'


export interface FrameworkPopperContext{
  append(vnode: VNode): void
  remove(vnode: VNode): void
}

export const FrameworkPopperContextToken: InjectionKey<FrameworkPopperContext> = Symbol('FrameworkPopperContextToken')

export const FrameworkInstances = shallowReactive(new Set())