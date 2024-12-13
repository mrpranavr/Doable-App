
export type TaskStatus = 'Incomplete' | 'Complete' | 'Overdue'

export type TaskType = 'Group' | 'Individual'

export type Task = {
  id: string,
  title: string,
  startDate: number,
  endDate: number,
  status: TaskStatus,
  type: TaskType,
  description?: string,
  user_id: string,
  parent_task?: string
}