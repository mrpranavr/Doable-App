import { Task } from "./Types";

export const mockTasks: Task[] = [
  // Parent Tasks
  {
    id: "task-1",
    title: "Plan Project Sprint", 
    startDate: new Date("2024-12-12T09:30:00"),
    endDate: new Date("2024-12-17T17:00:00"),
    status: "Incomplete",
    description: "Define goals and milestones for the sprint.",
    user_id: "user-1",
    priority: "High"
  },
  {
    id: "task-2",
    title: "Design Mockups",
    startDate: new Date("2024-12-17T08:00:00"), 
    endDate: new Date("2024-12-23T16:30:00"),
    status: "Incomplete",
    description: "Create wireframes and high-fidelity designs for the application.",
    user_id: "user-2",
    priority: "High"
  },

  // Subtasks of "Plan Project Sprint"
  {
    id: "task-3",
    title: "Define Team Roles",
    startDate: new Date("2024-12-12T10:15:00"),
    endDate: new Date("2024-12-13T11:45:00"),
    status: "Complete",
    description: "Assign roles to team members for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Medium"
  },
  {
    id: "task-4",
    title: "Outline Sprint Objectives",
    startDate: new Date("2024-12-13T13:30:00"),
    endDate: new Date("2024-12-14T15:00:00"),
    status: "Incomplete",
    description: "Detail the objectives and deliverables for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "High"
  },
  {
    id: "task-5",
    title: "Set Deadlines",
    startDate: new Date("2024-12-14T09:00:00"),
    endDate: new Date("2024-12-15T14:30:00"),
    status: "Incomplete",
    description: "Establish deadlines for all deliverables.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Medium"
  },
  {
    id: "task-6",
    title: "Allocate Resources",
    startDate: new Date("2024-12-15T11:15:00"),
    endDate: new Date("2024-12-16T16:45:00"),
    status: "Incomplete",
    description: "Determine the resources required for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Medium"
  },
  {
    id: "task-7",
    title: "Identify Potential Risks",
    startDate: new Date("2024-12-16T08:45:00"),
    endDate: new Date("2024-12-17T13:15:00"),
    status: "Incomplete",
    description: "List and assess potential risks for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "High"
  },
  {
    id: "task-8",
    title: "Prepare Kickoff Presentation",
    startDate: new Date("2024-12-17T10:30:00"),
    endDate: new Date("2024-12-18T15:45:00"),
    status: "Incomplete",
    description: "Create a presentation to communicate sprint goals and roles.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Low"
  },
  {
    id: "task-9",
    title: "Gather Feedback from Stakeholders",
    startDate: new Date("2024-12-18T14:00:00"),
    endDate: new Date("2024-12-19T16:30:00"),
    status: "Incomplete",
    description: "Obtain input and approval from stakeholders.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "High"
  },
  {
    id: "task-10",
    title: "Finalize Sprint Plan",
    startDate: new Date("2024-12-19T09:15:00"),
    endDate: new Date("2024-12-20T12:00:00"),
    status: "Incomplete",
    description: "Incorporate feedback and finalize the sprint plan.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Urgent"
  },

  // Subtasks of "Design Mockups"
  {
    id: "task-11",
    title: "Create Wireframes",
    startDate: new Date("2024-12-17T08:30:00"),
    endDate: new Date("2024-12-18T14:15:00"),
    status: "Incomplete",
    description: "Design low-fidelity wireframes for all screens.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "High"
  },
  {
    id: "task-12",
    title: "Review Wireframes",
    startDate: new Date("2024-12-18T10:45:00"),
    endDate: new Date("2024-12-19T15:30:00"),
    status: "Incomplete",
    description: "Collaboratively review and approve wireframes.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "Medium"
  },
  {
    id: "task-13",
    title: "Create High-Fidelity Designs",
    startDate: new Date("2024-12-19T09:30:00"),
    endDate: new Date("2024-12-20T16:45:00"),
    status: "Incomplete",
    description: "Convert wireframes into high-fidelity designs.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "High"
  },
  {
    id: "task-14",
    title: "Prepare Design Specifications",
    startDate: new Date("2024-12-20T11:00:00"),
    endDate: new Date("2024-12-21T17:30:00"),
    status: "Incomplete",
    description: "Document design specifications for developers.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "Medium"
  },
  {
    id: "task-15",
    title: "Collaborate with Developers",
    startDate: new Date("2024-12-21T08:15:00"),
    endDate: new Date("2024-12-22T13:45:00"),
    status: "Incomplete",
    description: "Ensure designs are properly implemented by developers.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "High"
  },
];
