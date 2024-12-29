
export type TaskStatus = 'Incomplete' | 'Complete' | 'Overdue'
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
export type Task = {
  id: string,
  title: string,
  startDate: Date,
  endDate: Date,
  status: TaskStatus,
  description?: string,
  user_id: string,
  parent_task?: string,
  priority: TaskPriority,
  tags?: string[]
}
