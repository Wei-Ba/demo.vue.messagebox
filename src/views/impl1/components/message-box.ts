import MessageBoxComponent from './message-box.vue'
import { render, h, VNode, MaybeRef, isProxy, unref } from 'vue'
import { isFunction } from '@utils/is'

export type MessageBoxComponent = typeof MessageBoxComponent

const tryGetValue = (val: any) => isFunction(val) ? val() : unref(val)

interface MessageBoxOptions {
  title: MaybeRef<string> | (() => string)
  to?: MaybeRef<string>
  message: VNode | MaybeRef<string> | (() => VNode | string)
}

function CreateMessageBox(options: MessageBoxOptions){
  const container = document.createElement('div')
  
  options = isProxy(options) ? options : new Proxy(options, {
    get(t, p, r){
      if(['title', 'to', 'message'].includes(p as string)) return tryGetValue(Reflect.get(t, p, r))
      return Reflect.get(t, p, r)
    }
  })
  const children = { default: isFunction(options.message) ? options.message : () => options.message} //isVNode(options.message) ? options.message : isFunction(options.message) ? { default: options.message } : null
 
  const vnode = h(() => h(
    MessageBoxComponent, 
    options as any,
    children
  ))
  render(vnode, container)
}

MessageBoxComponent.create = CreateMessageBox
MessageBoxComponent.alert = (message: MessageBoxOptions['message'], title: MessageBoxOptions['title']) => {
  CreateMessageBox({
    title,
    message
  })
}

interface IMessageBox extends MessageBoxComponent {
  create: typeof CreateMessageBox
  alert: (message: MessageBoxOptions['message'], title: MessageBoxOptions['title']) => void
}

export const MessageBox = MessageBoxComponent as IMessageBox