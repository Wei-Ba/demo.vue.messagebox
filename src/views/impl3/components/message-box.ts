import MessageBoxComponent from './message-box.vue'
import { h, VNode, inject, reactive, createVNode } from 'vue'


import { isString, isFunction } from '@utils'
import { FrameworkPopperContext, FrameworkPopperContextToken } from './framework'
import { tryToRefs } from '@utils'



export interface MessageBoxProps {
  title: string,
  message: VNode | string | (() => VNode | string),
  __close__?: () => void
  to?: Element | string
}
interface MessageBoxOptions extends MessageBoxProps{}

function CreateMessageBox(this: FrameworkPopperContext, options: MessageBoxOptions){
  const context = this
  const children = !isString(options.message) ? { default: isFunction(options.message) ? options.message : () => options.message} : null

  const props = reactive({
    ...tryToRefs(options),
    __close__(){ context.remove(vnode) }
  })
  const resolveProps = () => props
  const vnode = createVNode(() => createVNode(MessageBoxComponent, resolveProps(), children))
  this.append(vnode)
}

function alert(this: FrameworkPopperContext,  message: MessageBoxOptions['message'], title?: MessageBoxOptions['title']) {
  if (!title) title = ''
  CreateMessageBox.call(this, {
    title,
    message
  })
}

export function useMessageBox(){
  const context = inject(FrameworkPopperContextToken)
  if (!context) throw new Error('MessageBox component must be used with FrameworkPopperConext Provider')
  return {
    create: CreateMessageBox.bind(context),
    alert: alert.bind(context)
  }
}