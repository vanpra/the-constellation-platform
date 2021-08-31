import { useRouter } from "next/dist/client/router";
import React from "react";
import { TransparentRoundedButton } from "../../components/Buttons";
import ErrorDataScaffold from "../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { usePost } from "../../utils/supabase/db";
import parse from "html-react-parser";
import { PostHeader } from "../../components/Post/PostHeader";
import { SaltSection } from "../../components/Post/SaltSection";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { error, post } = usePost(id);

  return (
    <>
      <ErrorDataScaffold error={error} data={post}>
        <PageScaffold>
          <TransparentRoundedButton
            className="mr-6 bg-white"
            text="Translate"
            onClick={() => {
              console.log("translate");
            }}
          />

          <PostHeader post={post} />

          <p className="text-2xl font-normal mt-4">{post?.description}</p>

          <div className="py-2">
            <hr className="border-gray-400 border-opacity-40 border-1"></hr>
          </div>

          <SaltSection post={post} />

          <div className="text-xl">{parse(post?.content || "")}</div>

          <p className="text-2xl font-bold mt-8">Discussion</p>
        </PageScaffold>
      </ErrorDataScaffold>
    </>
  );
}
