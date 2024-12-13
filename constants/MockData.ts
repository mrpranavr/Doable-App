import { Task } from "./Types";

export const mockTasks: Task[] = [
  // Parent Tasks
  {
    id: "task-1",
    title: "Plan Project Sprint",
    startDate: 1702502400000, // Example timestamp
    endDate: 1702924800000, // Example timestamp
    status: "Incomplete",
    type: "Group",
    description: "Define goals and milestones for the sprint.",
    user_id: "user-1",
  },
  {
    id: "task-2",
    title: "Design Mockups",
    startDate: 1702924800000,
    endDate: 1703443200000,
    status: "Incomplete",
    type: "Individual",
    description: "Create wireframes and high-fidelity designs for the application.",
    user_id: "user-2",
  },
  {
    id: "task-3",
    title: "Develop Backend APIs",
    startDate: 1702502400000,
    endDate: 1703107200000,
    status: "Overdue",
    type: "Group",
    description: "Set up server-side architecture and APIs.",
    user_id: "user-3",
  },

  // Subtasks of "Plan Project Sprint"
  {
    id: "task-4",
    title: "Define Team Roles",
    startDate: 1702502400000,
    endDate: 1702588800000,
    status: "Complete",
    type: "Individual",
    description: "Assign roles to team members for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-5",
    title: "Outline Sprint Objectives",
    startDate: 1702588800000,
    endDate: 1702675200000,
    status: "Incomplete",
    type: "Individual",
    description: "Detail the objectives and deliverables for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
  },

  // Subtasks of "Design Mockups"
  {
    id: "task-6",
    title: "Create Wireframes",
    startDate: 1702924800000,
    endDate: 1703011200000,
    status: "Incomplete",
    type: "Individual",
    description: "Design low-fidelity wireframes for all screens.",
    user_id: "user-2",
    parent_task: "task-2",
  },
  {
    id: "task-7",
    title: "Review Wireframes",
    startDate: 1703011200000,
    endDate: 1703097600000,
    status: "Incomplete",
    type: "Group",
    description: "Collaboratively review and approve wireframes.",
    user_id: "user-2",
    parent_task: "task-2",
  },

  // Subtasks of "Develop Backend APIs"
  {
    id: "task-8",
    title: "Set Up Database",
    startDate: 1702502400000,
    endDate: 1702588800000,
    status: "Overdue",
    type: "Individual",
    description: "Configure the database and define schema.",
    user_id: "user-3",
    parent_task: "task-3",
  },
  {
    id: "task-9",
    title: "Implement Authentication APIs",
    startDate: 1702588800000,
    endDate: 1702675200000,
    status: "Overdue",
    type: "Individual",
    description: "Develop APIs for user authentication and authorization.",
    user_id: "user-3",
    parent_task: "task-3",
  },
];
