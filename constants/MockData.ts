import { Task } from "./Types";

export const mockGroupTasks : Array<Task> = [
  {
    id: "1",
    type: 'Group',
    title: "Design meeting",
    tasksToComplete: 5,
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'complete'
  },
  {
    id: "2",
    type: 'Group',
    title: "daily project",
    tasksToComplete: 1,
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'incomplete'
  },
  {
    id: "3",
    type: 'Group',
    title: "weekly planning",
    tasksToComplete: 7,
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'overdue'
  },
  {
    id: "4",
    type: 'Group',
    title: "Attend Tution Class",
    tasksToComplete: 7,
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'incomplete'
  },
  {
    id: "5",
    type: 'Group',
    title: "Work out at gym",
    tasksToComplete: 7,
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'incomplete'
  },
]