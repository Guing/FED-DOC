import { inject, DefineComponent } from 'vue'
import { CommonFieldType } from './types'
export const SchemaFormContextKey = Symbol()

export const useVJSFContext = function() {
  const context: { SchemaItem: CommonFieldType } | undefined = inject(
    SchemaFormContextKey,
  )
  if (!context) {
    throw Error('SchemaForm needed')
  }
  return context
}
