import MessageBoxComponent from './message-box.vue'
import { render, VNode, MaybeRef, unref, createVNode, reactive, computed,watch } from 'vue'
import { isFunction } from '@utils/is'
import { tryToRefs } from '@utils/vue'

export type MessageBoxComponent = typeof MessageBoxComponent

interface MessageBoxOptions {
  title: MaybeRef<string> | (() => string)
  to?: MaybeRef<string>
  message: VNode | MaybeRef<string> | (() => VNode | string)
}

function CreateMessageBox(options: MessageBoxOptions){
  const container = document.createElement('div')

  const props = reactive({
    ...tryToRefs(options),
    title: computed(isFunction(options.title) ? options.title : () => options.title),
  })
  
  const children = { default: isFunction(props.message) ? props.message : () => props.message}
 
  const vnode = createVNode(() => createVNode(
    MessageBoxComponent, 
    props,
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