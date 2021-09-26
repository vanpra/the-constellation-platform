import { useRouter } from "next/dist/client/router";
import React from "react";
import JointLessonCard from "../../../components/Cards/JointLessonCard";
import ErrorDataLayout from "../../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../../components/Scaffolds/PageScaffold";
import { useJointLessons, useTopic } from "../../../utils/supabase/db";

export default function JointLessonsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { error, jointLessons } = useJointLessons(id as string);
  const { error: err, topic } = useTopic(id as unknown as number);

  return (
    <>
      <ErrorDataLayout error={err} data={topic}>
        <ErrorDataLayout error={error} data={jointLessons}>
          <PageScaffold title={topic?.title + " - Joint Lessons"}>
            {jointLessons?.length === 0 ? (
              <p className="text-2xl">
                There are no joint lessons just yet! <br />
                Create a joint lesson to harness the power of shared
                experiences!
              </p>
            ) : (
              <div className="flex flex-col space-y-6">
                {jointLessons?.map((lesson, index) => (
                  <JointLessonCard key={index} jointLesson={lesson} />
                ))}
              </div>
            )}
          </PageScaffold>
        </ErrorDataLayout>
      </ErrorDataLayout>
    </>
  );
}
