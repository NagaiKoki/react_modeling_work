import * as zod from "zod"
import { ResultConstructorProps } from "../shared/Result"
import ValueObject from '../shared/ValueObject'

const MAX_DETAIL_LENGTH = 4000

export default class TaskDetail extends ValueObject<TaskDetailProps> {
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

      const params: ResultConstructorProps<TaskDetail, null> = {
        status: 'FAILURE',
        contents
      }

      return this.getResult<TaskDetail, null>(params)
    }
  }

  public static factory(props: TaskDetailProps) {
    return new TaskDetail(props)
  }
}

export type TaskDetailProps = {
  value: string
}

const valueSchema = zod.string().max(MAX_DETAIL_LENGTH, { message: `文字数は${MAX_DETAIL_LENGTH}文字以内にしてほしいな` })