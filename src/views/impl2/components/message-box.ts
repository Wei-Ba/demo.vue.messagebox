import MessageBoxComponent from './message-box.vue'
import { render, VNode, createVNode,h, reactive, watch } from 'vue'

import { isString, isFunction, tryToRefs } from '@utils'

export type MessageBoxComponent = typeof MessageBoxComponent
export interface MessageBoxProps {
  title: string,
  message: VNode | string | (() => VNode | string),
  to?: Element | string
}
interface MessageBoxOptions extends MessageBoxProps{}


function CreateMessageBox(options: MessageBoxOptions){
  const container = document.createElement('div')
  const props = reactive({
    ...tryToRefs(options)
  })
  
  const children = !isString(props.message) ? { default: isFunction(props.message) ? props.message : () => props.message} : null

  const vnode = createVNode(MessageBoxComponent, props, children)
  render(vnode, container)
}

MessageBoxComponent.create = CreateMessageBox
MessageBoxComponent.alert = (message: MessageBoxOptions['message'], title: MessageBoxOptions['title']) => {
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