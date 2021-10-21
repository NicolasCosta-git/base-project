import { ClassType } from 'class-transformer/ClassTransformer'
import { Request, Response } from 'express'
import { validateInput } from './validation.helper'
export async function validationHandler (req: Request, res: Response, dto: ClassType<any>, urlParams?: any) {
  const input = validateInput(dto, urlParams ?? req.body)
  if (input.errors.length > 0) {
    await res.status(400)
    await res.json(input.errors)
  } else return input.data
}
