export default interface JointLesson {
  lesson_title: string;
  lessons: { post_id: number; post_title: string }[];
}
