import MessageBoxComponent from './message-box.vue'
import { h, VNode, inject } from 'vue'

import { isString, isFunction } from '@/utils'
import { FrameworkPopperContext, FrameworkPopperContextToken } from './framework'

export interface MessageBoxProps {
  title: string,
  message: VNode | string | (() => VNode | string),
  __close__?: () => void
  to?: Element | string
}
interface MessageBoxOptions extends MessageBoxProps{}

function CreateMessageBox(this: FrameworkPopperContext, options: MessageBoxOptions){

  const children = !isString(options.message) ? { default: isFunction(options.message) ? options.message : () => options.message} : null
  Reflect.set(options, '__close__', () => { this.remove(vnode) })
  const vnode = h(() => h(MessageBoxComponent, options, children as never))
  this.append(vnode)
}

function alert(this: FrameworkPopperContext,  message: MessageBoxOptions['message'], title?: MessageBoxOptions['title']) {
  if (!title) title = ''
  CreateMessageBox.call(this, {
    title,
    message
  })
}
type MessageBoxComponent = typeof MessageBoxComponent

export function useMessageBox(){
  const context = inject(FrameworkPopperContextToken)
  if (!context) throw new Error('MessageBox component must be used with FrameworkPopperConext Provider')
  return {
    create: CreateMessageBox.bind(context),
    alert: alert.bind(context)
  }
}