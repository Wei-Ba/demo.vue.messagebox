import MessageBoxComponent from './message-box.vue'
import { render, h, VNode } from 'vue'

import { isString, isFunction } from '@/utils'

export type MessageBoxComponent = typeof MessageBoxComponent
export interface MessageBoxProps {
  title: string,
  message: VNode | string | (() => VNode | string),
  to?: Element | string
}
interface MessageBoxOptions extends MessageBoxProps{}


function CreateMessageBox(options: MessageBoxOptions){
  const container = document.createElement('div')

  const children = !isString(options.message) ? { default: isFunction(options.message) ? options.message : () => options.message} : null
  const vnode = h(MessageBoxComponent, options, children as never)
  render(vnode, container)
}

MessageBoxComponent.create = CreateMessageBox
MessageBoxComponent.alert = (message: MessageBoxOptions['message'], title?: MessageBoxOptions['title']) => {
  if (!title) title = ''
  CreateMessageBox({
    title,
    message
  })
}

interface IMessageBox extends MessageBoxComponent{
  create(options: MessageBoxOptions): void
  alert(message: MessageBoxOptions['message'], title?: MessageBoxOptions['title']): Promise<void>
}

export const MessageBox = MessageBoxComponent as IMessageBox