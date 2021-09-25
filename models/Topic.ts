export default interface Topic {
  id: number;
  title: string;
  description: string;
}

export const anyTopic = { id: -1, title: "Any", description: "Any topic" };
