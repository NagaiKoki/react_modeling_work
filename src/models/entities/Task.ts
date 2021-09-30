import Entity from "../shared/Entity"
import TaskName, { TaskNameProps } from "../values/TaskName"
import TaskDetail, { TaskDetailProps } from "../values/TaskDetail"
import TaskPriority, { TaskPriorityProps } from "../values/TaskPriority"

/**
 * - タスク名 
 * - タスク詳細
 * - 優先順位
 * - 終了フラグ
 * - カテゴリ
 */
export default class Task extends Entity<TaskProps> {
    public getName() {
        return this.props.name
    }

    public getDetail() {
        return this.props.detail
    }

    public getPriority() {
        return this.props.priority
    }

    public changeName(newName: string) {
        const name = TaskName.factory({
            value: newName
        })

        this.props = {...this.props, name}
    }

    public changeDetail(newDetail: string) {
        const detail = TaskDetail.factory({
            value: newDetail
        })

        this.props = { ...this.props, detail }
    }

    public changePriority(newPriority: number) {
        const priority = TaskPriority.factory({
            value: newPriority
        })

        this.props = { ...this.props, priority }
    }

    public static factory(props: FactoryProps) {
        
        const name = TaskName.factory({
            value: props.name.value
        })

        const detail = TaskDetail.factory({
            value: props.detail?.value || ''
        })

        const priority = TaskPriority.factory({
            value: props.priority?.value  || 1
        })

        return new Task({name, detail, priority })
    }
}

type TaskProps = {
    id?: number
    name: TaskName
    detail?: TaskDetail
    priority?: TaskPriority
    isCompleted?: boolean
    categories?: any[]
}

type FactoryProps = {
    name: TaskNameProps
    detail: TaskDetailProps
    priority?: TaskPriorityProps
}

