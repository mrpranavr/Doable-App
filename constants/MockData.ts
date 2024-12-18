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

  // Subtasks of "Plan Project Sprint"
  {
    id: "task-3",
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
    id: "task-4",
    title: "Outline Sprint Objectives",
    startDate: 1702588800000,
    endDate: 1702675200000,
    status: "Incomplete",
    type: "Individual",
    description: "Detail the objectives and deliverables for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-5",
    title: "Set Deadlines",
    startDate: 1702675200000,
    endDate: 1702761600000,
    status: "Incomplete",
    type: "Individual",
    description: "Establish deadlines for all deliverables.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-6",
    title: "Allocate Resources",
    startDate: 1702761600000,
    endDate: 1702848000000,
    status: "Incomplete",
    type: "Individual",
    description: "Determine the resources required for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-7",
    title: "Identify Potential Risks",
    startDate: 1702848000000,
    endDate: 1702934400000,
    status: "Incomplete",
    type: "Individual",
    description: "List and assess potential risks for the sprint.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-8",
    title: "Prepare Kickoff Presentation",
    startDate: 1702934400000,
    endDate: 1703020800000,
    status: "Incomplete",
    type: "Individual",
    description: "Create a presentation to communicate sprint goals and roles.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-9",
    title: "Gather Feedback from Stakeholders",
    startDate: 1703020800000,
    endDate: 1703107200000,
    status: "Incomplete",
    type: "Individual",
    description: "Obtain input and approval from stakeholders.",
    user_id: "user-1",
    parent_task: "task-1",
  },
  {
    id: "task-10",
    title: "Finalize Sprint Plan",
    startDate: 1703107200000,
    endDate: 1703193600000,
    status: "Incomplete",
    type: "Individual",
    description: "Incorporate feedback and finalize the sprint plan.",
    user_id: "user-1",
    parent_task: "task-1",
  },

  // Subtasks of "Design Mockups"
  {
    id: "task-11",
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
    id: "task-12",
    title: "Review Wireframes",
    startDate: 1703011200000,
    endDate: 1703097600000,
    status: "Incomplete",
    type: "Individual",
    description: "Collaboratively review and approve wireframes.",
    user_id: "user-2",
    parent_task: "task-2",
  },
  {
    id: "task-13",
    title: "Create High-Fidelity Designs",
    startDate: 1703097600000,
    endDate: 1703184000000,
    status: "Incomplete",
    type: "Individual",
    description: "Convert wireframes into high-fidelity designs.",
    user_id: "user-2",
    parent_task: "task-2",
  },
  {
    id: "task-14",
    title: "Prepare Design Specifications",
    startDate: 1703184000000,
    endDate: 1703270400000,
    status: "Incomplete",
    type: "Individual",
    description: "Document design specifications for developers.",
    user_id: "user-2",
    parent_task: "task-2",
  },
  {
    id: "task-15",
    title: "Collaborate with Developers",
    startDate: 1703270400000,
    endDate: 1703356800000,
    status: "Incomplete",
    type: "Individual",
    description: "Ensure designs are properly implemented by developers.",
    user_id: "user-2",
    parent_task: "task-2",
  },
];
