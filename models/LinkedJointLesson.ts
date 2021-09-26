export default interface LinkedJointLesson {
  lesson_id: number;
  lesson_title: string;
  topic_id: string;
  lessons?: { post_id: number; post_title: string }[];
}
