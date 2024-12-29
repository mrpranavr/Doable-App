import { Task } from "./Types";

export const mockTasks: Task[] = [
  // Parent Tasks
  {
    id: "task-1",
    title: "Plan Project Sprint", 
    startDate: new Date("2024-12-12T09:30:00"),
    endDate: new Date("2024-12-17T17:00:00"),
    status: "Incomplete",
    description: "Define goals and milestones for the upcoming sprint. This includes identifying key deliverables, establishing success metrics, and ensuring alignment with overall project objectives. The planning should account for team capacity and potential dependencies.",
    user_id: "user-1",
    priority: "High",
    tags: ["Planning", "Project Management", "Sprint"]
  },
  {
    id: "task-2",
    title: "Design Mockups",
    startDate: new Date("2024-12-17T08:00:00"), 
    endDate: new Date("2024-12-23T16:30:00"),
    status: "Incomplete",
    description: "Create comprehensive wireframes and high-fidelity designs for the application. This includes designing the user interface, establishing a consistent visual language, and ensuring the designs meet accessibility standards while maintaining brand guidelines.",
    user_id: "user-2",
    priority: "High",
    tags: ["Design", "UI/UX", "Mockups"]
  },

  // Subtasks of "Plan Project Sprint"
  {
    id: "task-3",
    title: "Define Team Roles",
    startDate: new Date("2024-12-12T10:15:00"),
    endDate: new Date("2024-12-13T11:45:00"),
    status: "Complete",
    description: "Assign roles and responsibilities to team members for the sprint, ensuring clear accountability and optimal resource utilization. Consider individual strengths and development opportunities when making assignments.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Medium",
    tags: ["Team", "Planning", "Roles"]
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
    priority: "High",
    tags: ["Planning", "Objectives", "Sprint"]
  },
  {
    id: "task-5",
    title: "Set Deadlines",
    startDate: new Date("2024-12-14T09:00:00"),
    endDate: new Date("2024-12-15T14:30:00"),
    status: "Incomplete",
    description: "Establish realistic and achievable deadlines for all deliverables, taking into account team velocity, potential blockers, and dependencies between tasks. Include buffer time for unexpected challenges.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "Medium",
    tags: ["Timeline", "Planning", "Deadlines"]
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
    priority: "Medium",
    tags: ["Resources", "Planning", "Management"]
  },
  {
    id: "task-7",
    title: "Identify Potential Risks",
    startDate: new Date("2024-12-16T08:45:00"),
    endDate: new Date("2024-12-17T13:15:00"),
    status: "Incomplete",
    description: "List and assess potential risks for the sprint, including technical challenges, resource constraints, and external dependencies. Develop mitigation strategies for high-priority risks and establish contingency plans.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "High",
    tags: ["Risk Assessment", "Planning", "Analysis"]
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
    priority: "Low",
    tags: ["Presentation", "Communication", "Kickoff"]
  },
  {
    id: "task-9",
    title: "Gather Feedback from Stakeholders",
    startDate: new Date("2024-12-18T14:00:00"),
    endDate: new Date("2024-12-19T16:30:00"),
    status: "Incomplete",
    description: "Obtain comprehensive input and approval from stakeholders regarding sprint objectives, timeline, and expected outcomes. Document all feedback and concerns for proper addressing in the final plan.",
    user_id: "user-1",
    parent_task: "task-1",
    priority: "High",
    tags: ["Feedback", "Stakeholders", "Communication"]
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
    priority: "Urgent",
    tags: ["Planning", "Sprint", "Final"]
  },

  // Subtasks of "Design Mockups"
  {
    id: "task-11",
    title: "Create Wireframes",
    startDate: new Date("2024-12-17T08:30:00"),
    endDate: new Date("2024-12-18T14:15:00"),
    status: "Incomplete",
    description: "Design comprehensive low-fidelity wireframes for all screens, focusing on layout, user flow, and core functionality. Include annotations for interactive elements and state changes.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "High",
    tags: ["Design", "Wireframes", "UI/UX"]
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
    priority: "Medium",
    tags: ["Review", "Wireframes", "Collaboration"]
  },
  {
    id: "task-13",
    title: "Create High-Fidelity Designs",
    startDate: new Date("2024-12-19T09:30:00"),
    endDate: new Date("2024-12-20T16:45:00"),
    status: "Incomplete",
    description: "Transform approved wireframes into polished, high-fidelity designs that incorporate brand guidelines, typography, color schemes, and visual elements. Ensure consistency across all screens and create necessary design variants.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "High",
    tags: ["Design", "High-Fidelity", "UI/UX"]
  },
  {
    id: "task-14",
    title: "Prepare Design Specifications",
    startDate: new Date("2024-12-20T11:00:00"),
    endDate: new Date("2024-12-21T17:30:00"),
    status: "Incomplete",
    description: "Document detailed design specifications for developers, including spacing, dimensions, interactions, animations, and responsive behavior guidelines. Create a comprehensive style guide for consistent implementation.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "Medium",
    tags: ["Documentation", "Design", "Specifications"]
  },
  {
    id: "task-15",
    title: "Collaborate with Developers",
    startDate: new Date("2024-12-21T08:15:00"),
    endDate: new Date("2024-12-22T13:45:00"),
    status: "Incomplete",
    description: "Work closely with the development team to ensure designs are implemented accurately and efficiently. Provide clarification on design decisions, assist with technical constraints, and review implementation progress regularly.",
    user_id: "user-2",
    parent_task: "task-2",
    priority: "High",
    tags: ["Collaboration", "Development", "Implementation"]
  },
];
