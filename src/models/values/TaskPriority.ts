import * as zod from "zod"
import { ResultConstructorProps } from "../shared/Result"
import ValueObject from '../shared/ValueObject'

export default class TaskPriority extends ValueObject<TaskPriorityProps> {
  public value() {
    return this.props.value
  }

  public validation() {
    const { value } = this.props
    const result = valueSchema.safeParse(value)

    if (!result.success) {
      const contents = result.error.issues.map(issue => {
        return {
          path: issue.path[0],
          code: issue.code,
          title: issue.message
        }
      })

      const params: ResultConstructorProps<TaskPriority, null> = {
        status: 'FAILURE',
        contents
      }

      return this.getResult<TaskPriority, null>(params)
    }
  }

  public static factory(props: TaskPriorityProps) {
    return new TaskPriority(props)
  }
}

export type TaskPriorityProps = {
  value: number
}

const valueSchema = zod.number().min(1, { message: "1以上の数字にしてね！" })