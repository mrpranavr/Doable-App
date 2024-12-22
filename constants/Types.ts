
export type TaskStatus = 'Incomplete' | 'Complete' | 'Overdue'

export type Task = {
  id: string,
  title: string,
  startDate: number,
  endDate: number,
  status: TaskStatus,
  description?: string,
  user_id: string,
  parent_task?: string
}