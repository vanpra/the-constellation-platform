import { useRouter } from "next/dist/client/router";
import React from "react";
import LinkedJointLesson from "../../models/LinkedJointLesson";
import BaseCard from "./BaseCard";

interface JointLessonCardProps {
  jointLesson: LinkedJointLesson;
}

export default function JointLessonCard(props: JointLessonCardProps) {
  const { jointLesson } = props;
  const router = useRouter();

  return (
    <BaseCard className="hover:cursor-default">
      <p className="text-xl font-semibold">{jointLesson?.lesson_title}</p>
      <p>Stories:</p>
      <ul className="list-disc list-inside ml-4">
        {jointLesson?.lessons?.map((lesson, index) => (
          <li key={index}>
            <span
              className="text-primary text-lg hover:cursor-pointer"
              onClick={() => {
                router.push(`/posts/${lesson.post_id}`);
              }}
            >
              {lesson.post_title}
            </span>
          </li>
        ))}
      </ul>
    </BaseCard>
  );
}
