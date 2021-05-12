import { inject, ref, Ref } from 'vue'
import type { Context as JssContextValue } from './types'

export const defaultContextValue: JssContextValue = {
  classNamePrefix: '',
  disableStylesGeneration: false
}

// export default JssContext
const JssContext = Symbol('vue3Jss')

export function injectJssContext (): Ref<JssContextValue> {
  return inject(JssContext, ref(defaultContextValue))
}

export default JssContext
