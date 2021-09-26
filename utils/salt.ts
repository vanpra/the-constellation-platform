export interface SaltStage {
  id: number;
  name: string;
}

export const saltStages = [
  { id: 0, name: "None" },
  { id: 1, name: "Mobilize" },
  { id: 2, name: "Shared Dream" },
  { id: 3, name: "Self-Assessment" },
  { id: 4, name: "Action Plan" },
  { id: 5, name: "Action!" },
  { id: 6, name: "Learn and Share" },
];

export const anySaltStage = { id: -1, name: "Any" };
