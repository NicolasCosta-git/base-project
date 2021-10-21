import { validateSync } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { ClassType } from 'class-transformer/ClassTransformer'

export function validateInput<T> (Class: ClassType<T>, input) {
  const instance = plainToClass(Class, input) as Partial<any>
  const errors = validateSync(instance, {
    whitelist: true,
    validationError: {
      target: false,
      value: false
    }
  })
  return { data: instance as any, errors: errors ?? null }
}
