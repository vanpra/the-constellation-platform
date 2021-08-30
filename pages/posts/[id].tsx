import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import { RedRoundedButton, TransparentRoundedButton } from "../../components/Buttons";
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
            onClick={() => { console.log("translate"); }}
          />

          <PostHeader
            post={post}
          />

          <div /* TAGS */
            className="py-2 px-1 space-x-2 flex"
          >
            <RedRoundedButton className="text-sm" text="tag" onClick={() => { }} />
            <RedRoundedButton className="text-sm" text="tag2" onClick={() => { }} />
          </div>

          <p className="text-xl font-normal">
            {post?.description}
          </p>

          <div className="py-2">
            <hr className="border-gray-400 border-opacity-40 border-1"></hr>
          </div>

         <SaltSection post={post}/>

          {parse(post?.content || "")}

          <p className="text-2xl">
            Discussion component
          </p>
        </PageScaffold>
      </ErrorDataScaffold>
    </>
  );
}
