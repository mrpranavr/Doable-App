
export type TaskStatus = 'incomplete' | 'complete' | 'overdue'

export type TaskType = 'Group' | 'Quick Task'

export type Task = {
  id: string,
  title: string,
  tasksToComplete?: number,
  startDate: number,
  endDate: number,
  status: TaskStatus,
  type: TaskType
}